import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/transaction.model';
import { AppError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

// @desc    Get all transactions for a family
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const familyId = req.user?.familyId;

    // Build query
    const query: any = { familyId };

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string),
      };
    } else if (req.query.startDate) {
      query.date = { $gte: new Date(req.query.startDate as string) };
    } else if (req.query.endDate) {
      query.date = { $lte: new Date(req.query.endDate as string) };
    }

    // Filter by category
    if (req.query.categoryId) {
      query.categoryId = req.query.categoryId;
    }

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by created by
    if (req.query.createdBy) {
      query.createdBy = req.query.createdBy;
    }

    // Filter by assigned to
    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }

    // Filter by minimum amount
    if (req.query.minAmount) {
      query.amount = { $gte: parseFloat(req.query.minAmount as string) };
    }

    // Filter by maximum amount
    if (req.query.maxAmount) {
      if (query.amount) {
        query.amount.$lte = parseFloat(req.query.maxAmount as string);
      } else {
        query.amount = { $lte: parseFloat(req.query.maxAmount as string) };
      }
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Transaction.countDocuments(query);

    // Sort
    const sort: any = {};
    if (req.query.sortBy) {
      const parts = (req.query.sortBy as string).split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.date = -1; // Default sort by date descending
    }

    // Execute query
    const transactions = await Transaction.find(query)
      .populate('categoryId', 'name color icon')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('approvedBy', 'name')
      .sort(sort)
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination: any = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: transactions.length,
      pagination,
      total,
      data: transactions,
    });
  } catch (error) {
    logger.error(`Get transactions error: ${error}`);
    next(error);
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('categoryId', 'name color icon')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('approvedBy', 'name');

    if (!transaction) {
      return next(new AppError(`Transaction not found with id of ${req.params.id}`, 404));
    }

    // Check if transaction belongs to user's family
    if (transaction.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to access this transaction', 403));
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    logger.error(`Get transaction error: ${error}`);
    next(error);
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Add user and family to request body
    req.body.createdBy = req.user?.id;
    req.body.familyId = req.user?.familyId;

    // If status is not provided, set default based on user role
    if (!req.body.status && req.user?.role === 'user') {
      req.body.status = 'pending';
    }

    const transaction = await Transaction.create(req.body);

    // Populate references for response
    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('categoryId', 'name color icon')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('approvedBy', 'name');

    res.status(201).json({
      success: true,
      data: populatedTransaction,
    });
  } catch (error) {
    logger.error(`Create transaction error: ${error}`);
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(new AppError(`Transaction not found with id of ${req.params.id}`, 404));
    }

    // Check if transaction belongs to user's family
    if (transaction.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to update this transaction', 403));
    }

    // Check if user is authorized to update the transaction
    const isAdmin = req.user?.role === 'admin';
    const isCreator = transaction.createdBy.toString() === req.user?.id;
    const isAssigned = transaction.assignedTo?.toString() === req.user?.id;

    if (!isAdmin && !isCreator && !isAssigned) {
      return next(new AppError('Not authorized to update this transaction', 403));
    }

    // If approving a transaction, add approvedBy
    if (
      req.body.status === 'completed' &&
      transaction.status === 'pending' &&
      isAdmin
    ) {
      req.body.approvedBy = req.user?.id;
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('categoryId', 'name color icon')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('approvedBy', 'name');

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    logger.error(`Update transaction error: ${error}`);
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(new AppError(`Transaction not found with id of ${req.params.id}`, 404));
    }

    // Check if transaction belongs to user's family
    if (transaction.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to delete this transaction', 403));
    }

    // Check if user is authorized to delete the transaction
    const isAdmin = req.user?.role === 'admin';
    const isCreator = transaction.createdBy.toString() === req.user?.id;

    if (!isAdmin && !isCreator) {
      return next(new AppError('Not authorized to delete this transaction', 403));
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete transaction error: ${error}`);
    next(error);
  }
}; 
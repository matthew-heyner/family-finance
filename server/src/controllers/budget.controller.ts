import { Request, Response, NextFunction } from 'express';
import Budget from '../models/budget.model';
import Transaction from '../models/transaction.model';
import { AppError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

// @desc    Get all budgets for a family
// @route   GET /api/budgets
// @access  Private
export const getBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const familyId = req.user?.familyId;

    // Build query
    const query: any = { familyId };

    // Filter by active status
    if (req.query.isActive) {
      query.isActive = req.query.isActive === 'true';
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.$or = [
        {
          startDate: {
            $lte: new Date(req.query.endDate as string),
          },
          endDate: {
            $gte: new Date(req.query.startDate as string),
          },
        },
      ];
    } else if (req.query.startDate) {
      query.endDate = { $gte: new Date(req.query.startDate as string) };
    } else if (req.query.endDate) {
      query.startDate = { $lte: new Date(req.query.endDate as string) };
    }

    // Filter by period
    if (req.query.period) {
      query.period = req.query.period;
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Budget.countDocuments(query);

    // Sort
    const sort: any = {};
    if (req.query.sortBy) {
      const parts = (req.query.sortBy as string).split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.startDate = -1; // Default sort by start date descending
    }

    // Execute query
    const budgets = await Budget.find(query)
      .populate('categories.categoryId', 'name color icon')
      .populate('createdBy', 'name')
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
      count: budgets.length,
      pagination,
      total,
      data: budgets,
    });
  } catch (error) {
    logger.error(`Get budgets error: ${error}`);
    next(error);
  }
};

// @desc    Get single budget
// @route   GET /api/budgets/:id
// @access  Private
export const getBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id)
      .populate('categories.categoryId', 'name color icon')
      .populate('createdBy', 'name');

    if (!budget) {
      return next(new AppError(`Budget not found with id of ${req.params.id}`, 404));
    }

    // Check if budget belongs to user's family
    if (budget.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to access this budget', 403));
    }

    // Get current spending for each category
    if (budget.isActive) {
      const startDate = budget.startDate;
      const endDate = budget.endDate;

      for (const category of budget.categories) {
        const transactions = await Transaction.find({
          familyId: budget.familyId,
          categoryId: category.categoryId,
          type: 'expense',
          status: 'completed',
          date: { $gte: startDate, $lte: endDate },
        });

        const spent = transactions.reduce((total, transaction) => total + transaction.amount, 0);
        category.spent = spent;
        category.remaining = category.amount - spent;
      }

      await budget.save();
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    logger.error(`Get budget error: ${error}`);
    next(error);
  }
};

// @desc    Create new budget
// @route   POST /api/budgets
// @access  Private
export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Add user and family to request body
    req.body.createdBy = req.user?.id;
    req.body.familyId = req.user?.familyId;

    // Validate total amount matches sum of category amounts
    if (req.body.categories && req.body.categories.length > 0) {
      const totalCategoryAmount = req.body.categories.reduce(
        (sum: number, category: any) => sum + category.amount,
        0
      );

      if (totalCategoryAmount !== req.body.totalAmount) {
        return next(
          new AppError(
            'Sum of category amounts must equal the total budget amount',
            400
          )
        );
      }
    }

    const budget = await Budget.create(req.body);

    // Populate references for response
    const populatedBudget = await Budget.findById(budget._id)
      .populate('categories.categoryId', 'name color icon')
      .populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: populatedBudget,
    });
  } catch (error) {
    logger.error(`Create budget error: ${error}`);
    next(error);
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
export const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return next(new AppError(`Budget not found with id of ${req.params.id}`, 404));
    }

    // Check if budget belongs to user's family
    if (budget.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to update this budget', 403));
    }

    // Validate total amount matches sum of category amounts if categories are being updated
    if (req.body.categories && req.body.categories.length > 0) {
      const totalAmount = req.body.totalAmount || budget.totalAmount;
      const totalCategoryAmount = req.body.categories.reduce(
        (sum: number, category: any) => sum + category.amount,
        0
      );

      if (totalCategoryAmount !== totalAmount) {
        return next(
          new AppError(
            'Sum of category amounts must equal the total budget amount',
            400
          )
        );
      }
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('categories.categoryId', 'name color icon')
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    logger.error(`Update budget error: ${error}`);
    next(error);
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return next(new AppError(`Budget not found with id of ${req.params.id}`, 404));
    }

    // Check if budget belongs to user's family
    if (budget.familyId.toString() !== req.user?.familyId?.toString()) {
      return next(new AppError('Not authorized to delete this budget', 403));
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete budget error: ${error}`);
    next(error);
  }
}; 
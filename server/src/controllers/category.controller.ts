import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';
import { AppError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

// @desc    Get all categories for a family
// @route   GET /api/categories
// @access  Private
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const familyId = req.user?.familyId;

    // Find categories for the family or default categories
    const categories = await Category.find({
      $or: [
        { familyId },
        { isDefault: true },
      ],
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    logger.error(`Get categories error: ${error}`);
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new AppError(`Category not found with id of ${req.params.id}`, 404));
    }

    // Check if category belongs to user's family or is a default category
    if (
      category.familyId &&
      category.familyId.toString() !== req.user?.familyId?.toString() &&
      !category.isDefault
    ) {
      return next(new AppError('Not authorized to access this category', 403));
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Get category error: ${error}`);
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Add user and family to request body
    req.body.createdBy = req.user?.id;
    req.body.familyId = req.user?.familyId;

    // Check if category with same name already exists for this family
    const existingCategory = await Category.findOne({
      name: req.body.name,
      familyId: req.user?.familyId,
    });

    if (existingCategory) {
      return next(new AppError('Category with this name already exists', 400));
    }

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Create category error: ${error}`);
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return next(new AppError(`Category not found with id of ${req.params.id}`, 404));
    }

    // Check if category belongs to user's family
    if (
      category.familyId &&
      category.familyId.toString() !== req.user?.familyId?.toString()
    ) {
      return next(new AppError('Not authorized to update this category', 403));
    }

    // Prevent updating default categories
    if (category.isDefault) {
      return next(new AppError('Cannot update default categories', 403));
    }

    // Check if new name conflicts with existing category
    if (req.body.name && req.body.name !== category.name) {
      const existingCategory = await Category.findOne({
        name: req.body.name,
        familyId: req.user?.familyId,
      });

      if (existingCategory) {
        return next(new AppError('Category with this name already exists', 400));
      }
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Update category error: ${error}`);
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new AppError(`Category not found with id of ${req.params.id}`, 404));
    }

    // Check if category belongs to user's family
    if (
      category.familyId &&
      category.familyId.toString() !== req.user?.familyId?.toString()
    ) {
      return next(new AppError('Not authorized to delete this category', 403));
    }

    // Prevent deleting default categories
    if (category.isDefault) {
      return next(new AppError('Cannot delete default categories', 403));
    }

    // TODO: Check if category is used in transactions or budgets
    // If so, prevent deletion or implement soft delete

    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete category error: ${error}`);
    next(error);
  }
}; 
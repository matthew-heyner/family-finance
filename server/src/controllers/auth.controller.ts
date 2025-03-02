import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';
import User from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    // TODO: Send verification email

    // Send response
    sendTokenResponse(user, 201, res);
  } catch (error) {
    logger.error(`Registration error: ${error}`);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new AppError('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Send response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    logger.error(`Login error: ${error}`);
    next(error);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = (
  // @ts-ignore
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Logout error: ${error}`);
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`Get me error: ${error}`);
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user?.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`Update details error: ${error}`);
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('+password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return next(new AppError('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    logger.error(`Update password error: ${error}`);
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save({ validateBeforeSave: false });

    // TODO: Send email with reset token

    res.status(200).json({
      success: true,
      data: 'Email sent',
    });
  } catch (error) {
    logger.error(`Forgot password error: ${error}`);
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    logger.error(`Reset password error: ${error}`);
    next(error);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (
  user: any,
  statusCode: number,
  res: Response
): void => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE || '30') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
}; 
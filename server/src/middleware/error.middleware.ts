import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction
): void => {
  // Default error status and message
  let statusCode = 500;
  let message = 'Internal Server Error';
  let stack = process.env.NODE_ENV === 'production' ? '🥞' : err.stack;

  // If it's our custom error, use its status code and message
  if ('statusCode' in err) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log the error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err.stack || 'No stack trace available');
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      stack: process.env.NODE_ENV === 'production' ? undefined : stack,
    },
  });
}; 
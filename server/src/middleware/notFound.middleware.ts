import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

// Middleware to handle 404 errors
export const notFoundHandler = (
  req: Request,
  // @ts-ignore
  res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
}; 
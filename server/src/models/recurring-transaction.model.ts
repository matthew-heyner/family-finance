import mongoose, { Document, Schema } from 'mongoose';
import { TransactionType } from './transaction.model';

// Frequency type
export type RecurringFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';

// Recurring transaction interface
export interface IRecurringTransaction extends Document {
  title: string;
  amount: number;
  description: string;
  type: TransactionType;
  categoryId: mongoose.Types.ObjectId;
  frequency: RecurringFrequency;
  startDate: Date;
  endDate?: Date;
  nextOccurrence: Date;
  dayOfMonth?: number;
  dayOfWeek?: number;
  isActive: boolean;
  paymentMethod?: string;
  notes?: string;
  familyId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Recurring transaction schema
const RecurringTransactionSchema = new Schema<IRecurringTransaction>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [100, 'Description cannot be more than 100 characters'],
    },
    type: {
      type: String,
      enum: ['expense', 'income', 'transfer'],
      default: 'expense',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please add a category'],
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'],
      required: [true, 'Please add a frequency'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date'],
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    nextOccurrence: {
      type: Date,
      required: true,
    },
    dayOfMonth: {
      type: Number,
      min: 1,
      max: 31,
    },
    dayOfWeek: {
      type: Number,
      min: 0,
      max: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot be more than 500 characters'],
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for common queries
RecurringTransactionSchema.index({ familyId: 1, isActive: 1 });
RecurringTransactionSchema.index({ familyId: 1, nextOccurrence: 1 });
RecurringTransactionSchema.index({ familyId: 1, type: 1 });

export default mongoose.model<IRecurringTransaction>('RecurringTransaction', RecurringTransactionSchema); 
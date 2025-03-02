import mongoose, { Document, Schema } from 'mongoose';

// Budget period type
export type BudgetPeriod = 'monthly' | 'quarterly' | 'yearly' | 'custom';

// Budget category allocation interface
export interface IBudgetCategory {
  categoryId: mongoose.Types.ObjectId;
  amount: number;
  spent?: number;
  remaining?: number;
}

// Budget interface
export interface IBudget extends Document {
  name: string;
  description?: string;
  totalAmount: number;
  startDate: Date;
  endDate: Date;
  period: BudgetPeriod;
  categories: IBudgetCategory[];
  isActive: boolean;
  familyId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Budget schema
const BudgetSchema = new Schema<IBudget>(
  {
    name: {
      type: String,
      required: [true, 'Please add a budget name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Please add a total budget amount'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please add an end date'],
    },
    period: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly', 'custom'],
      default: 'monthly',
    },
    categories: [
      {
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        spent: {
          type: Number,
          default: 0,
        },
        remaining: {
          type: Number,
          default: function (this: any) {
            return this.amount;
          },
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
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
BudgetSchema.index({ familyId: 1, isActive: 1 });
BudgetSchema.index({ familyId: 1, startDate: 1, endDate: 1 });

export default mongoose.model<IBudget>('Budget', BudgetSchema); 
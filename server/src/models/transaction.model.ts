import mongoose, { Document, Schema } from 'mongoose';

// Transaction types
export type TransactionType = 'expense' | 'income' | 'transfer';

// Transaction status
export type TransactionStatus = 'pending' | 'completed' | 'rejected';

// Transaction interface
export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  categoryId: mongoose.Types.ObjectId;
  paymentMethod?: string;
  location?: string;
  notes?: string;
  tags?: string[];
  receiptUrl?: string;
  isRecurring: boolean;
  recurringId?: mongoose.Types.ObjectId;
  familyId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction schema
const TransactionSchema = new Schema<ITransaction>(
  {
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
    date: {
      type: Date,
      required: [true, 'Please add a date'],
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['expense', 'income', 'transfer'],
      default: 'expense',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'rejected'],
      default: 'completed',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please add a category'],
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot be more than 500 characters'],
    },
    tags: [String],
    receiptUrl: String,
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecurringTransaction',
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
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for common queries
TransactionSchema.index({ familyId: 1, date: -1 });
TransactionSchema.index({ familyId: 1, categoryId: 1 });
TransactionSchema.index({ familyId: 1, createdBy: 1 });
TransactionSchema.index({ familyId: 1, type: 1 });
TransactionSchema.index({ familyId: 1, status: 1 });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema); 
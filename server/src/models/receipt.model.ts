import mongoose, { Document, Schema } from 'mongoose';

// Receipt processing status
export type ReceiptStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Receipt interface
export interface IReceipt extends Document {
  originalFilename: string;
  fileUrl: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  extractedData?: {
    vendor?: string;
    date?: Date;
    total?: number;
    items?: Array<{
      description?: string;
      amount?: number;
      quantity?: number;
    }>;
    tax?: number;
  };
  processingStatus: ReceiptStatus;
  processingError?: string;
  transactionId?: mongoose.Types.ObjectId;
  familyId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Receipt schema
const ReceiptSchema = new Schema<IReceipt>(
  {
    originalFilename: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    extractedData: {
      vendor: String,
      date: Date,
      total: Number,
      items: [
        {
          description: String,
          amount: Number,
          quantity: Number,
        },
      ],
      tax: Number,
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    processingError: {
      type: String,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
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
ReceiptSchema.index({ familyId: 1, createdAt: -1 });
ReceiptSchema.index({ familyId: 1, processingStatus: 1 });
ReceiptSchema.index({ transactionId: 1 }, { sparse: true });

export default mongoose.model<IReceipt>('Receipt', ReceiptSchema); 
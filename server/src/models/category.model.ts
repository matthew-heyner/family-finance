import mongoose, { Document, Schema } from 'mongoose';

// Category interface
export interface ICategory extends Document {
  name: string;
  description?: string;
  color: string;
  icon?: string;
  isDefault: boolean;
  familyId?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Category schema
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    color: {
      type: String,
      required: [true, 'Please add a color'],
      default: '#6366F1', // Default indigo color
    },
    icon: {
      type: String,
      default: 'tag',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
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

// Create compound index for unique category names per family
CategorySchema.index({ name: 1, familyId: 1 }, { unique: true });

export default mongoose.model<ICategory>('Category', CategorySchema); 
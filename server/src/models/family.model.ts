import mongoose, { Document, Schema } from 'mongoose';

// Family interface
export interface IFamily extends Document {
  name: string;
  adminId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  settings: {
    currency: string;
    budgetNotifications: boolean;
    expenseApproval: boolean;
    childAccounts: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Family schema
const FamilySchema = new Schema<IFamily>(
  {
    name: {
      type: String,
      required: [true, 'Please add a family name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    settings: {
      currency: {
        type: String,
        default: 'USD',
      },
      budgetNotifications: {
        type: Boolean,
        default: true,
      },
      expenseApproval: {
        type: Boolean,
        default: false,
      },
      childAccounts: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add admin to members array before saving
FamilySchema.pre('save', function (next) {
  // If this is a new family, add the admin to the members array
  if (this.isNew && !this.members.includes(this.adminId)) {
    this.members.push(this.adminId);
  }
  next();
});

export default mongoose.model<IFamily>('Family', FamilySchema); 
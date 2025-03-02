import mongoose, { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  familyId?: mongoose.Types.ObjectId;
  isEmailVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password in queries
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function (): string {
  // @ts-ignore - Ignoring type error for jwt.sign
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'default_jwt_secret',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

export default mongoose.model<IUser>('User', UserSchema); 
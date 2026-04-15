import mongoose, { type Document, type Model, Schema } from 'mongoose';

export interface IUser extends Document {
  role: 'customer' | 'owner';
  name: string;
  email: string;
  phone: string;
  password: string; // bcrypt hash
  // Customer-only (optional)
  dob?: string;
  address?: string;
  // Owner-only (optional)
  propertyName?: string;
  propertyAddress?: string;
  rooms?: number;
  gst?: string;
}

const userSchema = new Schema<IUser>(
  {
    role: { type: String, enum: ['customer', 'owner'], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    // Customer fields
    dob: { type: String },
    address: { type: String },
    // Owner fields
    propertyName: { type: String },
    propertyAddress: { type: String },
    rooms: { type: Number },
    gst: { type: String },
  },
  { timestamps: true },
);

// Same email can register as both customer AND owner — unique per (email, role) pair
userSchema.index({ email: 1, role: 1 }, { unique: true });

// Prevent model re-compilation in Next.js hot-reload
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ?? mongoose.model<IUser>('User', userSchema);

import { Schema, model, Error, Document } from 'mongoose';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt'

export interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  createdAt: Date;
  password: string;
  isValidPassword(password: string): Promise<Error | boolean>;
}

const UserSchema = new Schema<User>(
  {
    
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: String, required: true, },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    throw new Error('Failed to hash password');
  }
});

UserSchema.methods.isValidPassword = async function (
  password: string,
): Promise<Error | boolean> {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to compare password');
  }
};

export const UserModel = model('User', UserSchema);

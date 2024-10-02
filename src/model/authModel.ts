import mongoose, { model, Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Interface for the user model
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);  // Use await to handle the async function properly

  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const User = model<UserDocument>("User", userSchema);
export default User;

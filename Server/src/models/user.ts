import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
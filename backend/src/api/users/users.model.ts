import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const transform = function (doc: IUser, ret: Record<string, any>) {
  delete ret.password;
  delete ret.__v;
};

const usersSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      transform,
    },
    toObject: {
      transform,
    },
  }
);

const User = mongoose.model<IUser>("User", usersSchema);
export default User;

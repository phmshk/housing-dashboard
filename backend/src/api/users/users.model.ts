import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const usersSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      transform: function (doc, ret: Record<string, any>) {
        // 'ret' is the plain object representation of the document
        delete ret.password; // delete the password field
        delete ret.__v; // delete the version key
      },
    },
  }
);

const User = mongoose.model<IUser>("User", usersSchema);
export default User;

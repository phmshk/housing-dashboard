import mongoose, { Document, SchemaTypes } from "mongoose";
import { IUser } from "../users/users.model";

export enum ApartmentStatus {
  NEW = "new",
  CONTACTED = "contacted",
  VIEWED = "viewed",
  REJECTED = "rejected",
}

export interface IApartment extends Document {
  title: string;
  link: string;
  price: string;
  status: ApartmentStatus;
  user: mongoose.Types.ObjectId | IUser;
}

const apartmentsSchema = new mongoose.Schema<IApartment>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    price: String,
    status: {
      type: String,
      enum: ApartmentStatus,
      default: ApartmentStatus.NEW,
    },
    user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Apartment = mongoose.model<IApartment>("Apartments", apartmentsSchema);
export default Apartment;

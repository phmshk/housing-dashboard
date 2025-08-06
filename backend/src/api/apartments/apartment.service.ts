import mongoose from "mongoose";
import Apartment, { ApartmentStatus, IApartment } from "./apartment.model";

export interface CreateApartmentDto {
  title: string;
  link: string;
  price: string;
  status: ApartmentStatus;
  user: mongoose.Types.ObjectId;
}

async function createNewApartment(apartment: CreateApartmentDto) {
  return await Apartment.create(apartment);
}

export { createNewApartment };

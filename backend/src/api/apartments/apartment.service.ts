import mongoose from "mongoose";
import Apartment, { ApartmentStatus } from "./apartment.model";

export interface CreateApartmentDto {
  title: string;
  link: string;
  price: string;
  status: ApartmentStatus;
  user: mongoose.Types.ObjectId;
}

async function createNew(apartment: CreateApartmentDto) {
  return await Apartment.create(apartment);
}

async function getAll(userId: mongoose.Types.ObjectId) {
  return await Apartment.find({ user: userId });
}

async function getById(apartmentId: string, userId: mongoose.Types.ObjectId) {
  return Apartment.findOne({ _id: apartmentId, user: userId });
}

async function updateById(
  apartmentId: string,
  params: any,
  userId: mongoose.Types.ObjectId
) {
  return await Apartment.findOneAndUpdate(
    { _id: apartmentId, user: userId },
    params,
    { new: true }
  );
}

async function deleteById(
  apartmentId: string,
  userId: mongoose.Types.ObjectId
) {
  return await Apartment.findOneAndDelete({ _id: apartmentId, user: userId });
}

export { createNew, getAll, getById, updateById, deleteById };

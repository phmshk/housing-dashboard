import { NextFunction, Request, Response } from "express";
import {
  createNew,
  getAll,
  getById,
  updateById,
  deleteById,
} from "./apartment.service";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";

async function createApartment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, link, price, status } = req.body;
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const newApartment = await createNew({
      title,
      link,
      price,
      status,
      user: userId,
    });
    return res.status(201).json(newApartment);
  } catch (error) {
    next(error);
  }
}

async function getApartments(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const apartments = await getAll(userId);
    return res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
}

async function getApartmentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const apartmentId = req.params.apartmentId;
    const apartment = await getById(apartmentId, userId);
    if (!apartment) {
      throw new ApiError(404, "No apartment with such id found");
    }

    return res.status(200).json(apartment);
  } catch (error) {
    next(error);
  }
}

async function updateApartmentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const apartmentId = req.params.apartmentId;
    const params = req.body;
    const updatedApartment = await updateById(apartmentId, params, userId);
    return res.status(201).json(updatedApartment);
  } catch (error) {
    next(error);
  }
}

async function deleteApartmentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const apartmentId = req.params.apartmentId;
    const deletedApartment = await deleteById(apartmentId, userId);
    if (!deletedApartment) {
      throw new ApiError(404, "No apartment with such id found");
    }
    return res.status(200).json(deletedApartment);
  } catch (error) {
    next(error);
  }
}

export {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartmentById,
  deleteApartmentById,
};

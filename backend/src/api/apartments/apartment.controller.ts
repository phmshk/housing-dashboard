import { NextFunction, Request, Response } from "express";
import { createNewApartment } from "./apartment.service";
import mongoose from "mongoose";

async function createApartment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, link, price, status } = req.body;
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const newApartment = await createNewApartment({
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

export { createApartment };

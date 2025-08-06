import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartmentById,
  deleteApartmentById,
} from "./apartment.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  createApartmentSchema,
  updateApartmentSchema,
} from "./apartment.schemas";
const apartmentsRouter = express.Router();

apartmentsRouter.get("/", authMiddleware, getApartments);
apartmentsRouter.get("/:apartmentId", authMiddleware, getApartmentById);

apartmentsRouter.post(
  "/",
  authMiddleware,
  validate(createApartmentSchema),
  createApartment
);

apartmentsRouter.patch(
  "/:apartmentId",
  authMiddleware,
  validate(updateApartmentSchema),
  updateApartmentById
);

apartmentsRouter.delete("/:apartmentId", authMiddleware, deleteApartmentById);

export default apartmentsRouter;

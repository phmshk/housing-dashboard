import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createApartment } from "./apartment.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createApartmentSchema } from "./apartment.schemas";
const apartmentsRouter = express.Router();

apartmentsRouter.get("/", authMiddleware);
apartmentsRouter.get("/:id", authMiddleware);

apartmentsRouter.post(
  "/",
  authMiddleware,
  validate(createApartmentSchema),
  createApartment
);

apartmentsRouter.patch("/:id", authMiddleware);

apartmentsRouter.delete("/:id", authMiddleware);

export default apartmentsRouter;

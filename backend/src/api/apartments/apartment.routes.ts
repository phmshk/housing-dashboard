import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
const apartmentsRouter = express.Router();

apartmentsRouter.get("/", authMiddleware);
apartmentsRouter.get("/:id", authMiddleware);

apartmentsRouter.post("/", authMiddleware);

apartmentsRouter.patch("/:id", authMiddleware);

apartmentsRouter.delete("/:id", authMiddleware);

export default apartmentsRouter;

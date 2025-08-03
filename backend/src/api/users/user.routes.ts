import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMe } from "./users.controller";
const usersRouter = express.Router();

usersRouter.get("/me", authMiddleware, getMe);

export default usersRouter;

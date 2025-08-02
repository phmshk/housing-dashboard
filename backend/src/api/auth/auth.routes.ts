import express from "express";
const usersRouter = express.Router();
import { registerUser, loginUser } from "./auth.controller";

usersRouter.post("/register", registerUser);
usersRouter.post("/auth/login", loginUser);

export default usersRouter;

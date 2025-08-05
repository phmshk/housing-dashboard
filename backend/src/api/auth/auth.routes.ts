import express from "express";
const authRoutes = express.Router();
import { registerUser, loginUser } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schemas";

authRoutes.post("/register", validate(registerSchema), registerUser);
authRoutes.post("/login", validate(loginSchema), loginUser);

export default authRoutes;

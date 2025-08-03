import express from "express";
const authRoutes = express.Router();
import { registerUser, loginUser } from "./auth.controller";

authRoutes.post("/register", registerUser);
authRoutes.post("/auth/login", loginUser);

export default authRoutes;

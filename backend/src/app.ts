import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import "express-async-errors";
import authRoutes from "./api/auth/auth.routes";
import usersRouter from "./api/users/user.routes";
import errorMiddleware from "./middlewares/error.middleware";
import apartmentsRouter from "./api/apartments/apartment.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/apartments", apartmentsRouter);

//final error middleware
app.use(errorMiddleware);

export default app;

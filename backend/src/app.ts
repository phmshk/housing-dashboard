import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import "express-async-errors";
import authRoutes from "./api/auth/auth.routes";
import usersRouter from "./api/users/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the backend!" });
});

export default app;

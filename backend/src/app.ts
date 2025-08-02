import express, { Request, Response } from "express";
import "express-async-errors";
import usersRouter from "./api/auth/auth.routes";

const app = express();
app.use(express.json());
app.use("/api", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the backend!" });
});

export default app;

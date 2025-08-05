import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if the error is an instance of custom ApiError
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  // For all other unexpected errors, send a generic 500 server error
  console.error(error);
  return res.status(500).json({
    message: "Internal Server Error",
  });
}

export default errorMiddleware;

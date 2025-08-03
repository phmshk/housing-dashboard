import { RequestHandler } from "express";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import User from "../api/users/users.model";
import { UserPayload } from "../types/express";
import { config } from "../config";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  let decodedToken: UserPayload;

  if (!jwtToken) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    decodedToken = jwt.verify(jwtToken, config.jwtSecret) as UserPayload;
  } catch (e) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  req.user = user;

  next();
};

export { authMiddleware };

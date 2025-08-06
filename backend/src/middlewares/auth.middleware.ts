import { RequestHandler } from "express";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import User from "../api/users/users.model";
import { UserPayload } from "../types/express";
import { config } from "../config";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    const decodedToken = jwt.verify(jwtToken, config.jwtSecret) as UserPayload;
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
};

export { authMiddleware };

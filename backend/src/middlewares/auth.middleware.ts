import { RequestHandler } from "express";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import User from "../api/users/users.model";
import { UserPayload } from "../types/express";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const jwtToken = req.cookies.jwt;
  let decodedToken: UserPayload;

  if (!jwtToken) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    decodedToken = jwt.verify(jwtToken, JWT_SECRET) as UserPayload;
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

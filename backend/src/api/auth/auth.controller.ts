import { NextFunction, Request, Response } from "express";
import { login, register } from "./auth.service";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const createdUser = await register(email, password);
    return res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { token, user } = await login(email, password);
    res.cookie("jwt", token, {
      httpOnly: true, // The cookie is not accessible via client-side script
      secure: false, // Only send over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export { registerUser, loginUser };

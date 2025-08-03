import { Request, Response } from "express";
import { login, register } from "./auth.service";

async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (email && password) {
    let createdUser;
    try {
      createdUser = await register(email, password);
    } catch (e) {
      console.error("An error occurred while registering user: ", e);
      return res.status(404);
    }
    return res.status(201).json(createdUser);
  } else {
    return res.status(400);
  }
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (email && password) {
    const { token, user } = await login(email, password);
    res.cookie("jwt", token, {
      httpOnly: true, // The cookie is not accessible via client-side script
      secure: false, // Only send over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });
    return res.status(200).json(user);
  } else {
    return res.status(400);
  }
}

export { registerUser, loginUser };

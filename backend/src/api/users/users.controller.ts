import { Request, Response } from "express";

function getMe(req: Request, res: Response) {
  const user = req.user;
  return res.status(200).json(user);
}

export { getMe };

import { IUser } from "../api/users/users.model";

export interface UserPayload {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

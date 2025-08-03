import { config } from "../../config";
import ApiError from "../../utils/ApiError";
import { hashPassword, validatePassword } from "../../utils/passwordHandling";
import User, { IUser } from "../users/users.model";
import jwt from "jsonwebtoken";

async function register(email: string, password: string) {
  const userExists = await User.exists({ email });

  if (userExists) {
    throw new ApiError(409, "Conflict: User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashedPassword });
  return newUser;
}

async function login(
  email: string,
  password: string
): Promise<{ token: string; user: IUser }> {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await validatePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({ _id: user?._id }, config.jwtSecret, {
    expiresIn: "1d",
  });

  return { token, user };
}

export { register, login };

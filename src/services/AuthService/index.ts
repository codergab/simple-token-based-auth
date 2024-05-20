
import { sign } from "jsonwebtoken";
import { User } from "../../models/user";
import { config } from "../../config/env";

const { JWT_SECRET } = config;

export const generateAccessToken = (user: User) => {
  const token = sign({ id: user._id, }, JWT_SECRET, { expiresIn: "1d" });

  return token;
}
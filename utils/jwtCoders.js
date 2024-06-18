import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { differenceInDays } from "date-fns";

config();

export function encodeRegistrationToken(user) {
  return jwt.sign({ role: user.user_role, id: user.id }, process.env.JWT_KEY, { expiresIn: "1d" });
}

export function decodeRegistrationToken(token) {
  const decodedUser = jwt.verify(token, process.env.JWT_KEY);
  if (differenceInDays(new Date(decodedUser.iat), new Date()) > 0) return null;
  else return decodedUser;
}

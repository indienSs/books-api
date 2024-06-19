import jwt from "jsonwebtoken";
import { addSeconds, differenceInDays } from "date-fns";

export function encodeRegistrationToken(user) {
  return jwt.sign({ role: user.user_role, id: user.id }, process.env.JWT_KEY, { expiresIn: "1d", noTimestamp: true });
}

export function decodeRegistrationToken(token) {
  const decodedUser = jwt.verify(token, process.env.JWT_KEY);
  if (differenceInDays(new Date(), addSeconds(new Date(), decodedUser.exp - decodedUser.iat)) > 0) return null;
  else return decodedUser;
}

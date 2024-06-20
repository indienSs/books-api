import createHttpError from "http-errors";
import { decodeRegistrationToken } from "../utils/jwtCoders.js";

class JWTMiddleware {
  validate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw createHttpError.Unauthorized("Unauthorized user");

      const user = decodeRegistrationToken(authorization);
      if (!user) throw createHttpError.Unauthorized("Token expired");

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}

export const jwtMiddleware = new JWTMiddleware();

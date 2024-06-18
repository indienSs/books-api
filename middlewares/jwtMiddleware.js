import createHttpError from "http-errors";
import { decodeRegistrationToken } from "../utils/jwtCoders.js";

class JWTMiddleware {
  validate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw createHttpError.Unauthorized("Unauthorized user");
      const token = authorization.replace(/Bearer\s?/, "");
      if (!token) throw createHttpError.Unauthorized("Unauthorized user");
      req.user = decodeRegistrationToken(token);
      next();
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }

  validateAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw createHttpError.Unauthorized("Unauthorized user");
      const token = authorization.replace(/Bearer\s?/, "");
      if (!token) throw createHttpError.Unauthorized("Unauthorized user");
      const user = decodeRegistrationToken(token);
      if (user.role !== 0) throw createHttpError.Forbidden("Access denied");
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}

export const jwtMiddleware = new JWTMiddleware();

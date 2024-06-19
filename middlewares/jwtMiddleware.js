import createHttpError from "http-errors";
import { decodeRegistrationToken } from "../utils/jwtCoders.js";
import { checkAdmin, checkAccess } from "../utils/checkAccess.js";
import { ACCESS_GET_ME } from "../constants/userAccess.js";

class JWTMiddleware {
  validate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw createHttpError.Unauthorized("Unauthorized user");
      const user = decodeRegistrationToken(authorization);
      if (!user) throw createHttpError.Unauthorized("Token expired");
      if (!checkAccess(user, ACCESS_GET_ME)) throw createHttpError.Forbidden("Access denied");
      req.user = user;
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
      const user = decodeRegistrationToken(authorization);
      if (!user) throw createHttpError.Unauthorized("Token expired");
      if (!checkAdmin(user)) throw createHttpError.Forbidden("Access denied");
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}

export const jwtMiddleware = new JWTMiddleware();

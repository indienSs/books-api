import { body, param, validationResult } from "express-validator";
import createHttpError from "http-errors";

export function errorsValidation(req, res, next) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else {
      const message = errors
        .array()
        .map(err => err.msg)
        .join("; ");
      throw createHttpError.BadRequest(message);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

export const bookValidation = [
  body("title", "Title missed").isString().notEmpty(),
  body("author", "Author missed").isString().notEmpty(),
  body("publicationDate", "PublicationDate missed").isISO8601().notEmpty(),
];

export const loginValidation = [
  body("username", "Username missed").isString().notEmpty(),
  body("password", "Password missed").isString().notEmpty(),
];

export const registerValidation = [body("email", "Email missed").isEmail().notEmpty()];

export const getMeValidation = [
  body("role", "Role missed").custom(value => typeof value === "string" || typeof value === "number"),
];

export const idParamValidation = [param("id", "Incorrect Id").custom(value => !Number.isNaN(+value))];
export const roleValidation = [body("role", "Incorrect role").custom(value => !Number.isNaN(+value))];

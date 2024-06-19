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
  body("title", "title missed").isString().notEmpty(),
  body("author", "author missed").isString().notEmpty(),
  body("publicationDate", "publicationDate missed").isISO8601().notEmpty(),
];

export const loginValidation = [
  body("username", "username missed").isString().notEmpty(),
  body("password", "password missed, min lenght 6, max length 16").isString().isLength({ min: 6, max: 16 }),
];

export const registerValidation = [body("email", "email missed").isEmail().notEmpty()];

export const getMeValidation = [
  body("role", "role missed").custom(value => typeof value === "string" || typeof value === "number"),
];

export const idParamValidation = [param("id", "Incorrect id").custom(value => !Number.isNaN(+value))];
export const roleValidation = [body("role", "Incorrect role").custom(value => !Number.isNaN(+value))];

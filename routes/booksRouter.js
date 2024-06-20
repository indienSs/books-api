import { Router } from "express";
import { booksController } from "../controllers/booksController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import * as validator from "../middlewares/validations.js";

export const booksRouter = new Router();

booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", validator.idParamValidation, validator.errorsValidation, booksController.getBook);
booksRouter.post(
  "/books",
  jwtMiddleware.validate,
  validator.bookValidation,
  validator.errorsValidation,
  booksController.addBook
);
booksRouter.put(
  "/books/:id",
  jwtMiddleware.validate,
  validator.bookValidation,
  validator.idParamValidation,
  validator.errorsValidation,
  booksController.updateBook
);
booksRouter.delete(
  "/books/:id",
  jwtMiddleware.validate,
  validator.idParamValidation,
  validator.errorsValidation,
  booksController.deleteBook
);

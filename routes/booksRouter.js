import { Router } from "express";
import { booksController } from "../controllers/booksController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import * as validator from "../middlewares/validations.js";

export const booksRouter = new Router();

booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", validator.idParamValidation, validator.errorsValidation, booksController.getBook);
booksRouter.post(
  "/books",
  jwtMiddleware.validateAdmin,
  validator.bookValidation,
  validator.errorsValidation,
  booksController.addBook
);
booksRouter.put(
  "/books/:id",
  jwtMiddleware.validateAdmin,
  validator.bookValidation,
  validator.idParamValidation,
  validator.errorsValidation,
  booksController.updateBook
);
booksRouter.delete(
  "/books/:id",
  jwtMiddleware.validateAdmin,
  validator.idParamValidation,
  validator.errorsValidation,
  booksController.deleteBook
);

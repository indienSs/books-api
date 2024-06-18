import { Router } from "express";
import { booksController } from "../controllers/booksController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { bookValidation, errorsValidation, idParamValidation } from "../middlewares/validations.js";

export const booksRouter = new Router();

booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", idParamValidation, errorsValidation, booksController.getBook);
booksRouter.post("/books", jwtMiddleware.validateAdmin, bookValidation, errorsValidation, booksController.addBook);
booksRouter.put(
  "/books/:id",
  jwtMiddleware.validateAdmin,
  bookValidation,
  idParamValidation,
  errorsValidation,
  booksController.updateBook
);
booksRouter.delete(
  "/books/:id",
  jwtMiddleware.validateAdmin,
  idParamValidation,
  errorsValidation,
  booksController.deleteBook
);

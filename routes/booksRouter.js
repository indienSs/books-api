import { Router } from "express";
import { booksController } from "../controllers/booksController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";

export const booksRouter = new Router();

booksRouter.post("/books", jwtMiddleware.validateAdmin, booksController.addBook);
booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.put("/books/:id", jwtMiddleware.validateAdmin, booksController.updateBook);
booksRouter.delete("/books/:id", jwtMiddleware.validateAdmin, booksController.deleteBook);

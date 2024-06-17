import { Router } from "express";
import { booksController } from "../controllers/booksController.js";

export const booksRouter = new Router();

booksRouter.post("/books", booksController.addBook);
booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.put("/books/:id", booksController.updateBook);
booksRouter.delete("/books/:id", booksController.deleteBook);

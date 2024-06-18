import createHttpError from "http-errors";
import { db } from "../database/db.js";

class BooksController {
  async addBook(req, res) {}

  async getBooks(_, res) {
    try {
      const books = await db.books.findMany();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  }

  async getBook(req, res) {
    try {
      const { id } = req.params;
      const book = await db.books.findUnique({ where: { id: +id } });
      if (!book) throw createHttpError.NotFound("Book not found");
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }

  async updateBook(req, res) {}

  async deleteBook(req, res) {}
}

export const booksController = new BooksController();

import createHttpError from "http-errors";
import { db } from "../database/db.js";
import { checkAdmin } from "../utils/checkAccess.js";

class BooksController {
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
      const book = await db.books.findUnique({ where: { id: Number(id) } });
      if (!book) throw createHttpError.NotFound("Book not found");
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }

  async addBook(req, res) {
    try {
      if (!checkAdmin(req.user)) throw createHttpError.Forbidden("Access denied");
      const { title, author, publicationDate, genres } = req.body;
      const book = await db.books.create({
        data: {
          title,
          author,
          publication_date: publicationDate,
          genres,
        },
      });
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      if (!checkAdmin(req.user)) throw createHttpError.Forbidden("Access denied");
      const { title, author, publicationDate, genres } = req.body;
      const book = await db.books.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title,
          author,
          publication_date: publicationDate,
          genres,
        },
      });
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async deleteBook(req, res) {
    try {
      if (!checkAdmin(req.user)) throw createHttpError.Forbidden("Access denied");
      await db.books.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}

export const booksController = new BooksController();

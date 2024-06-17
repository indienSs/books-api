import { db } from "../database/db.js";

class BooksController {
  async addBook(req, res) {}
  async getBooks(req, res) {
    try {
      const books = await db.books.findMany();
      res.status(200).json(books);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
  async getBook(req, res) {}
  async updateBook(req, res) {}
  async deleteBook(req, res) {}
}

export const booksController = new BooksController();

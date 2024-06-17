import { db } from "../database/db.js";

class BooksController {
  async addBook(req, res) {}
  async getBooks(req, res) {
    try {
      const books = await db.books.findMany({});
      res.json(books);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
  async getBook(req, res) {}
  async updateBook(req, res) {}
  async deleteBook(req, res) {}
}

export const booksController = new BooksController();

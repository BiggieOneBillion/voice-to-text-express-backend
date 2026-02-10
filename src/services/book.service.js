const httpStatus = require("http-status");
const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const ApiError = require("../utils/ApiError");

/**
 * Create a book
 * @param {Object} bookBody
 * @returns {Promise<Book>}
 */
const createBook = async (bookBody) => {
  return Book.create(bookBody);
};

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @returns {Promise<Book[]>}
 */
const queryBooks = async (filter) => {
  return Book.find(filter);
};

/**
 * Get book by id
 * @param {ObjectId} id
 * @param {ObjectId} authorId
 * @returns {Promise<Book>}
 */
const getBookById = async (id, authorId) => {
  const book = await Book.findOne({ _id: id, author: authorId }).populate(
    "chapters"
  );
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  return book;
};

/**
 * Delete book by id
 * @param {ObjectId} bookId
 * @param {ObjectId} authorId
 * @returns {Promise<Book>}
 */
const deleteBookById = async (bookId, authorId) => {
  const book = await Book.findOne({ _id: bookId, author: authorId });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  await book.deleteOne();
  // Delete associated chapters
  await Chapter.deleteMany({ book: bookId });
  return book;
};

module.exports = {
  createBook,
  queryBooks,
  getBookById,
  deleteBookById,
};

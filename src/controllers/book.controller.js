const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const bookService = require("../services/book.service");

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook({
    ...req.body,
    author: req.user._id,
  });
  res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
  const books = await bookService.queryBooks({ author: req.user._id });
  res.send(books);
});

const getBook = catchAsync(async (req, res) => {
  const book = await bookService.getBookById(req.params.id, req.user._id);
  res.send(book);
});

const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBookById(req.params.id, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
};

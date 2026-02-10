const httpStatus = require("http-status");
const Chapter = require("../models/Chapter");
const Book = require("../models/Book");
const ApiError = require("../utils/ApiError");

/**
 * Create a chapter
 * @param {Object} chapterBody
 * @param {ObjectId} authorId
 * @returns {Promise<Chapter>}
 */
const createChapter = async (chapterBody, authorId) => {
  const book = await Book.findOne({ _id: chapterBody.book, author: authorId });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  return Chapter.create(chapterBody);
};

/**
 * Get chapter by id
 * @param {ObjectId} id
 * @param {ObjectId} authorId
 * @returns {Promise<Chapter>}
 */
const getChapterById = async (id, authorId) => {
  const chapter = await Chapter.findById(id);
  if (!chapter) {
    throw new ApiError(httpStatus.NOT_FOUND, "Chapter not found");
  }
  const book = await Book.findOne({ _id: chapter.book, author: authorId });
  if (!book) {
    throw new ApiError(httpStatus.FORBIDDEN, "Not authorized");
  }
  return chapter;
};

/**
 * Update chapter by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @param {ObjectId} authorId
 * @returns {Promise<Chapter>}
 */
const updateChapterById = async (id, updateBody, authorId) => {
  const chapter = await getChapterById(id, authorId);
  Object.assign(chapter, updateBody);
  await chapter.save();
  return chapter;
};

/**
 * Delete chapter by id
 * @param {ObjectId} id
 * @param {ObjectId} authorId
 * @returns {Promise<Chapter>}
 */
const deleteChapterById = async (id, authorId) => {
  const chapter = await getChapterById(id, authorId);
  await chapter.deleteOne();
  return chapter;
};

/**
 * Query for chapters
 * @param {Object} filter
 * @returns {Promise<Chapter[]>}
 */
const queryChaptersByBook = async (bookId, authorId) => {
    const book = await Book.findOne({ _id: bookId, author: authorId });
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }
    return Chapter.find({ book: bookId }).sort("order");
};

module.exports = {
  createChapter,
  getChapterById,
  updateChapterById,
  deleteChapterById,
  queryChaptersByBook,
};

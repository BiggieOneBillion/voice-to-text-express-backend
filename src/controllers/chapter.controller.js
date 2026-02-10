const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const chapterService = require("../services/chapter.service");

const createChapter = catchAsync(async (req, res) => {
  const { bookId, ...chapterData } = req.body;
  const chapter = await chapterService.createChapter({
    ...chapterData,
    book: bookId,
  }, req.user._id);
  res.status(httpStatus.CREATED).send(chapter);
});

const updateChapter = catchAsync(async (req, res) => {
  const chapter = await chapterService.updateChapterById(req.params.id, req.body, req.user._id);
  res.send(chapter);
});

const updateChapterContent = catchAsync(async (req, res) => {
    const chapter = await chapterService.updateChapterById(req.params.id, { content: req.body.content }, req.user._id);
    res.send(chapter);
  });

const getChaptersByBook = catchAsync(async (req, res) => {
  const chapters = await chapterService.queryChaptersByBook(req.params.bookId, req.user._id);
  res.send(chapters);
});

const deleteChapter = catchAsync(async (req, res) => {
  await chapterService.deleteChapterById(req.params.id, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChapter,
  updateChapter,
  updateChapterContent,
  getChaptersByBook,
  deleteChapter,
};

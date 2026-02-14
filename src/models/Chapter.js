const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - order
 *         - book
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the chapter
 *         title:
 *           type: string
 *           description: The title of the chapter
 *         content:
 *           type: string
 *           description: The content of the chapter
 *         type:
 *           type: string
 *           enum: [chapter, preface, introduction, epilogue, appendix, acknowledgments, dedication]
 *           description: The type of the chapter
 *         order:
 *           type: number
 *           description: The display order of the chapter within the book
 *         book:
 *           type: string
 *           description: The ID of the book this chapter belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109cc
 *         title: "Chapter 1: The Beginning"
 *         content: Once upon a time...
 *         type: chapter
 *         order: 1
 *         book: 60d0fe4f5311236168a109cb
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      enum: [
        "chapter",
        "preface",
        "introduction",
        "epilogue",
        "appendix",
        "acknowledgments",
        "dedication",
      ],
    },
    order: {
      type: Number,
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);

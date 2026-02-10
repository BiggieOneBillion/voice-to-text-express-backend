const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const chapterValidation = require("../validations/chapter.validation");
const chapterController = require("../controllers/chapter.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chapters
 *   description: Chapter management
 */

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Create a new chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - order
 *               - bookId
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *               order:
 *                 type: number
 *               bookId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chapter created successfully
 */
router.post("/", auth, validate(chapterValidation.createChapter), chapterController.createChapter);

/**
 * @swagger
 * /api/chapters/{id}:
 *   put:
 *     summary: Update a chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 */
router.put("/:id", auth, validate(chapterValidation.updateChapter), chapterController.updateChapter);

/**
 * @swagger
 * /api/chapters/{id}/content:
 *   put:
 *     summary: Update chapter content
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Chapter content updated successfully
 */
router.put("/:id/content", auth, validate(chapterValidation.updateChapterContent), chapterController.updateChapterContent);

/**
 * @swagger
 * /api/chapters/book/{bookId}:
 *   get:
 *     summary: Get all chapters for a book
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of chapters
 */
router.get("/book/:bookId", auth, validate(chapterValidation.getChaptersByBook), chapterController.getChaptersByBook);

/**
 * @swagger
 * /api/chapters/{id}:
 *   delete:
 *     summary: Delete a chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 */
router.delete("/:id", auth, validate(chapterValidation.updateChapter), chapterController.deleteChapter);

module.exports = router;

const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const bookValidation = require("../validations/book.validation");
const bookController = require("../controllers/book.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, validate(bookValidation.createBook), bookController.createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books for the authenticated user
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, bookController.getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a specific book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book id
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.get("/:id", auth, validate(bookValidation.getBook), bookController.getBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book id
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.delete("/:id", auth, validate(bookValidation.getBook), bookController.deleteBook);

module.exports = router;

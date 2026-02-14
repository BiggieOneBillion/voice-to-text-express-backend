const express = require("express");
const convertController = require("../controllers/convert.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Convert
 *   description: Audio conversion and transcription
 */

/**
 * @swagger
 * /api/convert/transcribe:
 *   post:
 *     summary: Transcribe audio to text
 *     description: Converts a base64 encoded audio string into text using a transcription service.
 *     tags: [Convert]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - audio
 *             properties:
 *               audio:
 *                 type: string
 *                 description: Base64 encoded audio string
 *     responses:
 *       200:
 *         description: Transcription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: The transcribed text
 *       400:
 *         description: Invalid input or audio processing error
 */
router.post("/transcribe", convertController.transcribe);

module.exports = router;

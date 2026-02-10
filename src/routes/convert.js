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
 */
router.post("/transcribe", convertController.transcribe);

module.exports = router;

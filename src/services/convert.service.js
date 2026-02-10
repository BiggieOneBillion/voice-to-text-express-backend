const axios = require("axios");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Transcribe audio using AssemblyAI
 * @param {string} audioBase64
 * @returns {Promise<string>}
 */
const transcribeAudio = async (audioBase64) => {
  const buffer = Buffer.from(audioBase64, "base64");
  const filePath = path.join(__dirname, "../../audio.wav");
  fs.writeFileSync(filePath, buffer);

  try {
    // Upload audio to AssemblyAI
    const uploadRes = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      fs.createReadStream(filePath),
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          "transfer-encoding": "chunked",
        },
      }
    );

    const audioUrl = uploadRes.data.upload_url;

    // Request transcription
    const transcriptRes = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
        },
      }
    );

    const transcriptId = transcriptRes.data.id;

    // Poll for transcription completion
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        try {
          const pollingRes = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
              headers: {
                authorization: process.env.ASSEMBLYAI_API_KEY,
              },
            }
          );

          if (pollingRes.data.status === "completed") {
            // Cleanup file
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            resolve(pollingRes.data.text);
          } else if (pollingRes.data.status === "failed") {
            // Cleanup file
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Transcription failed"));
          } else {
            setTimeout(checkStatus, 3000);
          }
        } catch (error) {
          reject(error);
        }
      };
      checkStatus();
    });
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw error;
  }
};

module.exports = {
  transcribeAudio,
};

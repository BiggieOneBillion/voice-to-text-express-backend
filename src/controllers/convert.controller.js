const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const convertService = require("../services/convert.service");

const transcribe = catchAsync(async (req, res) => {
  const { audio } = req.body;
  const text = await convertService.transcribeAudio(audio);
  res.send({ text });
});

module.exports = {
  transcribe,
};

const mongoose = require("mongoose");

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

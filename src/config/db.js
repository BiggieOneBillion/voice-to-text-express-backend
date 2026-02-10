const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/voice-text-db";
  return mongoose.connect(mongoUri);
};

module.exports = connectDB;
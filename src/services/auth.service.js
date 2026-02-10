const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

/**
 * Register a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const registerUser = async (userBody) => {
  if (await User.findOne({ email: userBody.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  return User.create(userBody);
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Generate auth tokens
 * @param {ObjectId} userId
 * @returns {string}
 */
const generateAuthToken = (userId) => {
  const payload = {
    userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "24h",
  });
};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
  generateAuthToken,
};

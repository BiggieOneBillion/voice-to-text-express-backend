const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");

const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);
  const token = authService.generateAuthToken(user._id);
  res.status(httpStatus.CREATED).send({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = authService.generateAuthToken(user._id);
  res.send({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
});

const getMe = catchAsync(async (req, res) => {
  res.send({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    },
  });
});

module.exports = {
  register,
  login,
  getMe,
};

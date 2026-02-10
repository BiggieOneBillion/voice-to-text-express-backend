/**
 * Utility to catch errors in async middleware and pass them to the global error handler
 * @param {Function} fn - Async middleware function
 * @returns {Function} - Express middleware function
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;

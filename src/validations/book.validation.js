const Joi = require("joi");

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    status: Joi.string().valid("draft", "published"),
  }),
};

const getBook = {
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"id" must be a valid mongo id');
        }
        return value;
      })
  }),
};

module.exports = {
  createBook,
  getBook,
};

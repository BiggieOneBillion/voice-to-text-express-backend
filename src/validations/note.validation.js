const Joi = require("joi");

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().allow(""),
  }),
};

const getNote = {
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"id" must be a valid mongo id');
        }
        return value;
      })
  }),
};

const updateNote = {
    params: Joi.object().keys({
        id: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
              return helpers.message('"id" must be a valid mongo id');
            }
            return value;
          })
      }),
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
  }).min(1),
};

const appendToNote = {
    params: Joi.object().keys({
        id: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
              return helpers.message('"id" must be a valid mongo id');
            }
            return value;
          })
      }),
    body: Joi.object().keys({
      title: Joi.string(),
      content: Joi.string(),
    }).min(1),
  };

module.exports = {
  createNote,
  getNote,
  updateNote,
  appendToNote,
};

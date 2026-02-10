const Joi = require("joi");

const createChapter = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().allow(""),
    type: Joi.string().required().valid(
        "chapter",
        "preface",
        "introduction",
        "epilogue",
        "appendix",
        "acknowledgments",
        "dedication"
      ),
    order: Joi.number().required(),
    bookId: Joi.string().required().custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"bookId" must be a valid mongo id');
        }
        return value;
      })
  }),
};

const updateChapter = {
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
    type: Joi.string().valid(
        "chapter",
        "preface",
        "introduction",
        "epilogue",
        "appendix",
        "acknowledgments",
        "dedication"
      ),
    order: Joi.number(),
  }).min(1),
};

const updateChapterContent = {
    params: Joi.object().keys({
        id: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
              return helpers.message('"id" must be a valid mongo id');
            }
            return value;
          })
      }),
    body: Joi.object().keys({
      content: Joi.string().required(),
    }),
  };

const getChaptersByBook = {
  params: Joi.object().keys({
    bookId: Joi.string().required().custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"bookId" must be a valid mongo id');
        }
        return value;
      })
  }),
};

module.exports = {
  createChapter,
  updateChapter,
  updateChapterContent,
  getChaptersByBook,
};

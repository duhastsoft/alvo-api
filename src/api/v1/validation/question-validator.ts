import Joi from 'joi';

const idParam = {
  id: Joi.number().integer().min(1).required(),
};

const createDto = {
  text: Joi.string().trim().min(10).required(),
  answer1: Joi.string().trim().required(),
  answer2: Joi.string().trim().required(),
  answer3: Joi.string().trim().required(),
  answer4: Joi.string().trim().required(),
  image: Joi.string().uri(),
  rightAnswer: Joi.number().integer().min(1).max(4).required(),
  categoryId: Joi.number().integer().min(1),
};

const paramIdSchema = Joi.object(idParam);
const createSchema = Joi.object(createDto);

export { paramIdSchema, createSchema };

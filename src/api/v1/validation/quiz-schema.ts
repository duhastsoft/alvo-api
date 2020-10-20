import Joi from 'joi';

const testQuerySchema = Joi.object({
  category: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(5).max(30),
});

export { testQuerySchema };

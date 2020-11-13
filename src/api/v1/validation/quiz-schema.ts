import Joi from 'joi';

const testQuerySchema = Joi.object({
  category: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(5).max(30),
});

const examHistory = Joi.object({
  limit: Joi.number().integer().min(5).multiple(5).max(20).required(),
});

const examSchema = Joi.object({
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  examType: Joi.string().valid('category', 'free', 'vmt').required(),
  category: Joi.number().integer().min(1),
  questions: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().min(1).required(),
        selectedAnswer: Joi.number().integer().min(1).max(4).required(),
        rightAnswer: Joi.number().integer().min(1).max(4).required(),
      })
    )
    .min(5),
});

export { testQuerySchema, examHistory, examSchema };

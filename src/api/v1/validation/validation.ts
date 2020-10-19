import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const { details } = error;
      const errors = details.map((detail) => ({
        message: detail.message,
        param: detail.context?.key,
        value: detail.context?.value,
        location: 'params',
      }));
      res.status(400).json({ errors: errors });
    } else next();
  };
};

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { details } = error;
      const errors = details.map((detail) => ({
        message: detail.message,
        param: detail.context?.key,
        value: detail.context?.value,
        location: 'body',
      }));
      res.status(400).json({ errors: errors });
    } else next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      const { details } = error;
      const errors = details.map((detail) => ({
        message: detail.message,
        param: detail.context?.key,
        value: detail.context?.value,
        location: 'query',
      }));
      res.status(400).json({ errors });
    } else next();
  };
};

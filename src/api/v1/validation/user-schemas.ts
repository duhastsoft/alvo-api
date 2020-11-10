import Joi from 'joi';
import { UserRole } from '../entity/User';

const idParam = {
  id: Joi.number().integer().min(1).required(),
};

const createTk = {
  account: Joi.alternatives().try(
    Joi.string().trim().min(5).alphanum().required(),
    Joi.string().trim().email().required()
  ),
  password: Joi.string().trim().min(8).alphanum().required(),
};

const createDto = {
  account: Joi.string().trim().min(5).alphanum().required(),
  password: Joi.string().trim().min(8).required(),
  email: Joi.string().trim().email().required(),
  role: Joi.string().valid(UserRole.Customer).required(),
};

const updateDto = {
  account: Joi.string().trim().min(5).alphanum().required(),
  password: Joi.string().trim().min(8).alphanum().required(),
  email: Joi.string().trim().email().required(),
  givenName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  status: Joi.number().integer().min(1).max(3),
  role: Joi.string().valid(UserRole.Customer).min(1),
};

const createToken = Joi.object(createTk);
const createUser = Joi.object(createDto);
const updateUser = Joi.object(updateDto);
const paramId = Joi.object(idParam);

export { createToken, createUser, paramId, updateUser };

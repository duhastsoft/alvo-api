import Joi from 'joi';
import { UserRole } from '../entity/User';

const idParam = {
  id: Joi.number().integer().min(1).required(),
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

const updateUser = Joi.object(updateDto);
const paramId = Joi.object(idParam);

export { paramId, updateUser };

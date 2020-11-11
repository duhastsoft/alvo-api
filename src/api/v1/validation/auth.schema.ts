import Joi from 'joi';
import { UserRole } from '../entity/User';

const updateRole = Joi.object({
  userId: Joi.string().trim().guid().required(),
});

const createTk = {
  account: Joi.alternatives().try(
    Joi.string().trim().min(5).alphanum().required(),
    Joi.string().trim().email().required()
  ),
  password: Joi.string().trim().min(8).required(),
};

const createDto = {
  account: Joi.string().trim().min(5).alphanum().required(),
  password: Joi.string().trim().min(8).required(),
  email: Joi.string().trim().email().required(),
  role: Joi.string().valid(UserRole.Customer).required(),
};

const createToken = Joi.object(createTk);
const createUser = Joi.object(createDto);

export default { updateRole, createToken, createUser };

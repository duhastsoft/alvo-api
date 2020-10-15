import Joi from 'joi';

const creteToken = {
    account: Joi.string().trim().min(8).alphanum().required(),
    password: Joi.string().trim().min(8).alphanum().required(),
    email: Joi.string().trim().min(8).email().required(),
};

const createDto = {
    account: Joi.string().trim().min(8).alphanum().required(),
    password: Joi.string().trim().min(8).alphanum().required(),
    email: Joi.string().trim().min(8).email().required(),
    role: Joi.string().trim().alphanum().required(),
};

const createToken = Joi.object(creteToken);
const createUser = Joi.object(createDto);


export { createToken, createUser };
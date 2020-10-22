import Joi from 'joi';

const createTk = {
    account: Joi.alternatives().try(Joi.string().trim().min(8).alphanum().required(), Joi.string().trim().min(8).email().required()),
    password: Joi.string().trim().min(8).alphanum().required()
};

const createDto = {
    account: Joi.alternatives().try(Joi.string().trim().min(8).alphanum().required(), ) ,
    password: Joi.string().trim().min(8).alphanum().required(),
    email: Joi.string().trim().min(8).email().required(),
    role: Joi.number().integer().min(1)
};

const createToken = Joi.object(createTk);
const createUser = Joi.object(createDto);


export { createToken, createUser };
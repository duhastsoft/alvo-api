import Joi from 'joi';

const idParam = {
    id: Joi.number().integer().min(1).required(),
};

const createTk = {
    account: Joi.alternatives().try(Joi.string().trim().min(8).alphanum().required(), Joi.string().trim().min(8).email().required()),
    password: Joi.string().trim().min(8).alphanum().required()
};

const createDto = {
    account: Joi.alternatives().try(Joi.string().trim().min(8).alphanum().required(), ) ,
    password: Joi.string().trim().min(8).alphanum().required(),
    email: Joi.string().trim().min(8).email().required(),
    roleId: Joi.number().integer().min(1)
};

const updateDto = {
    account: Joi.alternatives().try(Joi.string().trim().min(8).alphanum().required(), ) ,
    password: Joi.string().trim().min(8).alphanum().required(),
    email: Joi.string().trim().min(8).email().required(),
    givenName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    status: Joi.number().integer().min(1).max(3),
    roleId: Joi.number().integer().min(1)
};

const createToken = Joi.object(createTk);
const createUser = Joi.object(createDto);
const updateUser = Joi.object(updateDto);
const paramId = Joi.object(idParam);


export { createToken, createUser, paramId, updateUser };
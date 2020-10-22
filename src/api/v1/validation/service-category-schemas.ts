import Joi from 'joi';

const idParam = {
    id: Joi.number().integer().min(1).required(),
};

const createDto = {
    name: Joi.string().trim().alphanum().required(),
    description: Joi.string().trim().required(),
};

const paramId = Joi.object(idParam);
const create = Joi.object(createDto);

export { create, paramId };
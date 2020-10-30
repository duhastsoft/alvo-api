import Joi from 'joi';

const idParam = {
    id: Joi.number().integer().min(1).required(),
};

const permission = Joi.object().keys({
    name: Joi.string().required().required(),
    actions: Joi.array().items(Joi.string()).required()
})

const createDto = {
    name: Joi.string().trim().alphanum().required(),
    description: Joi.string().trim().required(),
    permissions: Joi.array().items(permission).required(),
};

const paramId = Joi.object(idParam);
const create = Joi.object(createDto);


export { create, paramId };

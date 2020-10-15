import Joi from 'joi';

const permission = Joi.object().keys({
    name: Joi.string().required().required(),
    actions: Joi.array().items(Joi.string()).required()
})

const createDto = {
    name: Joi.string().trim().alphanum().required(),
    description: Joi.string().trim().required(),
    permissions: Joi.array().items(permission).required(),
};

const create = Joi.object(createDto);


export { create };

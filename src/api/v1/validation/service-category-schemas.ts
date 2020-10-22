import Joi from 'joi';


const createDto = {
    name: Joi.string().trim().alphanum().required(),
    description: Joi.string().trim().required(),
};

const create = Joi.object(createDto);

export { create };
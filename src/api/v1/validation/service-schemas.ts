import Joi from 'joi';


const createDto ={
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    serviceHours: Joi.string().trim().required(),
    contactNumber: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    contactName: Joi.string().trim().required().allow(''),
    image: Joi.string().allow('').uri(),
    latitud: Joi.string().trim().required().allow(''),
    longitude: Joi.string().trim().required().allow(''),
    priceRange: Joi.string().trim().required(),
    categoryId: Joi.string().trim().required()
}

const create = Joi.object(createDto);

export { create };
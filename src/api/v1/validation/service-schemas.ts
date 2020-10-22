import Joi from 'joi';


const idParam = {
    id: Joi.number().integer().min(1).required(),
};

const nameQuery = {
    name: Joi.string().trim().required(),
};

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
    categoryId: Joi.number().integer().min(1)
}

const paramId = Joi.object(idParam);
const queryName = Joi.object(nameQuery);
const create = Joi.object(createDto);

export { create , paramId, queryName};
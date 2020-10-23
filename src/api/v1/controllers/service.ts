import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Service from '../entity/Service';
import ServiceCategory from '../entity/ServiceCategory';


async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const serviceRepository = getRepository(Service);
    const serviceCRepository = getRepository(ServiceCategory);

    const newService = new Service();
    newService.address  = req.body.address; 
    newService.category = req.body.category;
    newService.contactName = req.body.contactName;
    newService.contactNumber = req.body.contactNumber;
    newService.description = req.body.description;
    newService.image = req.body.image;
    newService.latitud = req.body.latitud;
    newService.longitude = req.body.longitude;
    newService.name = req.body.name;
    newService.priceRange = req.body.priceRange;
    newService.serviceHours = req.body.serviceHours;

    try {
        const category = await serviceCRepository.findOneOrFail({id:req.body.categoryId});
        newService.category = category;
        await serviceRepository.save(newService);
    } catch (err) {
        if (err.constructor.name === 'EntityNotFoundError') res.status(404);
        next(err);
    }
}

async function obtainAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const serviceRepository = getRepository(Service);
    try {
      const result = await serviceRepository.find();
      res.status(200).json({ length: result.length, data: result});
    } catch (err) {
      next(err);
    }
}

async function findByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    const serviceRepository = getRepository(Service);
    try {
        const result = await serviceRepository.createQueryBuilder().select().where('name ILIKE :name', {name: `%${req.query.name}%`}).getMany()
        res.status(200).json({ data: result });
    } catch (err) {
      if (err.constructor.name === 'EntityNotFoundError') res.status(404);
      next(err);
    }
}

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const serviceRepository = getRepository(Service);
  const { body, params } = req;
  try {
    const service = await serviceRepository.findOneOrFail(params.id);

    if (body.categoryId) {
      const categoryRepository = getRepository(ServiceCategory);
      const category = await categoryRepository.findOneOrFail(body.categoryId);
      service.category = category || service.category;
    }

    service.address  = body.address ?? service.address; 
    service.category = body.category ?? service.category;
    service.contactName = body.contactName ?? service.contactName;
    service.contactNumber = body.contactNumber ?? service.contactNumber;
    service.description = body.description ?? service.description;
    service.image = body.image ?? service.image;
    service.latitud = body.latitud ?? service.latitud;
    service.longitude = body.longitude ?? service.longitude;
    service.name = body.name ?? service.name;
    service.priceRange = body.priceRange ?? service.priceRange;
    service.serviceHours = body.serviceHours ?? service.serviceHours;

    await serviceRepository.save(service);

    res.status(200).json({ data: service });
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const serviceRepository = getRepository(Service);
  try {
    const result = await serviceRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: `Service with id ${req.params.id} not found.` });
    }
  } catch (err) {
    next(err);
  }
}


export default {create, findByName, obtainAll, remove, update};
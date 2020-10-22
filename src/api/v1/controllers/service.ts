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


export default {create, findByName, obtainAll};
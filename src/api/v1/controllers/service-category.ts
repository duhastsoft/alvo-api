import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ServiceCategory from '../entity/ServiceCategory';


async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const serviceCRepository = getRepository(ServiceCategory);

    const newServiceC= new ServiceCategory();

    newServiceC.name = req.body.name;
    newServiceC.description = req.body.description;
    try{
        await serviceCRepository.save(newServiceC)
        res.status(201).json({
            message: 'Category record for service created',
            data: newServiceC
        });    
    }
    catch(err){
        if (err.constructor.name === 'EntityNotFoundError') res.status(404);
        next(err);
    }
}

async function obtainAllServices(_req: Request, res: Response, next: NextFunction): Promise<void> {
    const serviceCRepository = getRepository(ServiceCategory);
    try {
      const result = await serviceCRepository.find({relations: ['services']});
      res.status(200).json({ length: result.length, data: result});
    } catch (err) {
      next(err);
    }
}

async function obtainAllCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
    const serviceCRepository = getRepository(ServiceCategory);
    try {
      const result = await serviceCRepository.find();
      res.status(200).json({ length: result.length, data: result});
    } catch (err) {
      next(err);
    }
}

async function findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const serviceCRepository = getRepository(ServiceCategory);

    try {
        const service = await serviceCRepository.findOneOrFail(req.params.id, {relations:['services']});
        res.status(200).json({ data: service });
      } catch (err) {
        if (err.constructor.name === 'EntityNotFoundError') res.status(404);
        next(err);
      }
}

export default {create, obtainAllServices, obtainAllCategories, findById};

import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import ServiceCategory from '../entity/ServiceCategory';


async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const serviceCRepository = getManager().getRepository<ServiceCategory>(ServiceCategory);

    const newServiceC= new ServiceCategory();

    newServiceC.name = req.body.name;
    newServiceC.description = req.body.description;
    serviceCRepository.save(newServiceC)
    .then(data=>{
        res.status(201).json({
            message: 'Category record for service created',
            data: newServiceC
            });
    }).catch(err=>{
        next(err);
    });
        
}

export default {create};

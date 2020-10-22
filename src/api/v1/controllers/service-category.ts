import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import ServiceCategory from '../entity/ServiceCategory';


async function create(req: Request, res: Response): Promise<void> {

    const serviceCRepository = getManager().getRepository<ServiceCategory>(ServiceCategory);

    const newServiceC= new ServiceCategory();
    
    newServiceC.name = req.body.name;
    newServiceC.description = req.body.description;
    
    try {
        await serviceCRepository.save(newServiceC);
        res.status(201).json({
            message: 'Service Category record created'
          });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Service Category'
        });
    }
}

export default {create};

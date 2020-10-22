import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Service from '../entity/Service';
import ServiceCategory from '../entity/ServiceCategory';


async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const serviceRepository = getManager().getRepository<Service>(Service);
    const serviceCRepository = getManager().getRepository<ServiceCategory>(ServiceCategory);

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
        const category = await serviceCRepository.findOne({id:req.body.categoryId});
        if(category){
            newService.category = category;
            serviceRepository.save(newService).then(result=>{
                res.status(201).json({
                    message: 'Service record created'.length,
                    data: newService
                });
            }).catch(err=>{
                next(err);
            });
        }
        else{
            res.status(500).json({
                message: 'Service category not found'
            });
        }
        
    } catch (error) {
        next(error);
    }
}

export default {create};
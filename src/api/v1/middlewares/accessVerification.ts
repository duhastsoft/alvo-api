import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Role from '../entity/Role';
import Permission from '../entity/Permission';

const accessVerify = function (allowed: string, entity: string){
    const targetAllowed = allowed;
    const targetEntity = entity;
    return async function(req: Request, res: Response, next: NextFunction){
        const roleRepository = getManager().getRepository<Role>(Role);
        const foundRole = await roleRepository.findOne({where: {name: req.userData.role }, relations: ['permisions'] });
        if(foundRole){
            const foundPermision = foundRole.permisions.find(e => { return e.name == targetEntity});
            if(foundPermision && foundPermision.actions.find(e => e == targetAllowed)){
                return next();
            }
        }
        return res.status(401).json({
            message: 'Your lack of permissions prevents you from accessing this route'
        });
    }
}

export default accessVerify;

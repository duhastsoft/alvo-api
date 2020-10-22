import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Role from '../entity/Role';

export const accessVerify =  (allowed: string, entity: string) => {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void>  {
    const roleRepository = getManager().getRepository<Role>(Role);
    try{
      const foundRole = await roleRepository.findOneOrFail({
        where: { name: req.userData.role },
        relations: ['permisions'],
      });
      const foundPermision = foundRole.permisions.find((e) => {
        return e.name == entity;
      });
      if (foundPermision && foundPermision.actions.find((e) => e == allowed)) {
        next();
      }
      else{
        res.status(401).json({
          message: 'Your lack of permissions prevents you from accessing this route',
        });
      }
    }
    catch(err){
      if (err.constructor.name === 'EntityNotFoundError') res.status(404);
      next(err);
    }
  };
};

export default accessVerify;

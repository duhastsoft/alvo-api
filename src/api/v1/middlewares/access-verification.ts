import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Role from '../entity/Role';

export const accessVerify =  (allowed: string, entity: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const roleRepository = getManager().getRepository<Role>(Role);
    roleRepository.findOne({
      where: { name: req.userData.role },
      relations: ['permisions'],
    }).then(foundRole=>{
      if (foundRole) {
        const foundPermision = foundRole.permisions.find((e) => {
          return e.name == entity;
        });
        if (foundPermision && foundPermision.actions.find((e) => e == allowed)) {
          next();
        }
        else{
          res.status(401).json({
            message: 'Your lack of permissions prevents you from accessing this route - Permission',
          });
        }
      }
      else{
        res.status(401).json({
          message: 'Your lack of permissions prevents you from accessing this route - Role',
        });
      }
    }).catch(err=>{
      res.status(500).json({
        message: 'Unsuccessful search of Role',
      });
    });
  };
};

export default accessVerify;

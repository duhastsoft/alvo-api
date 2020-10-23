import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Role from '../entity/Role';
import Permission from '../entity/Permission';


async function obtainAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    const roleRepository = getRepository(Role);
    try {
      const result = await roleRepository.find();
      res.status(200).json({ length: result.length, data: result });
    } catch (err) {
      next(err);
    }
  }

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const roleRepository = getRepository(Role);
    const permissionRepository = getRepository(Permission);

    const newPermisions : Array<Permission>  = [];
    const newRole= new Role();
    Array.of(req.body.permissions)[0].forEach(e => {
        const newPermission = new Permission();
        newPermission.name = e.name;
        newPermission.actions = e.actions;
        newPermission.role = newRole;
        newPermisions.push(newPermission);
    });
    
    newRole.name = req.body.name;
    newRole.description = req.body.description;
    newRole.permisions = newPermisions;
    
    try {
        await roleRepository.save(newRole);
        await permissionRepository.save(newPermisions);
        res.status(201).json({
            message: 'Role record created',
            data: newRole
        });
    } catch (error) {
        next(error);
    }
}

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const rolerepository = getRepository(Role);
    const { body, params } = req;
    try {
      const service = await rolerepository.findOneOrFail(params.id);
      service.name = body.name ?? service.name;
      service.description = body.description ?? service.description;

      await rolerepository.save(service);
  
      res.status(200).json({ data: service });
    } catch (err) {
      if (err.constructor.name === 'EntityNotFoundError') res.status(404);
      next(err);
    }
  }

async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    const roleRepository = getRepository(Role);
    try {
      const result = await roleRepository.delete(req.params.id);
      if (result.affected) {
        res.status(200).json({ message: 'Role deleted' });
      } else {
        res.status(404).json({ message: `Role with id ${req.params.id} not found.` });
      }
    } catch (err) {
      next(err);
    }
  }

export default {create, remove, update, obtainAll};

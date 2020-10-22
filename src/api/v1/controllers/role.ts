import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Role from '../entity/Role';
import Permission from '../entity/Permission';


async function create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const roleRepository = getManager().getRepository<Role>(Role);
    const permissionRepository = getManager().getRepository<Permission>(Permission);

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

export default {create};

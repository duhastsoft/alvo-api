import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getManager } from 'typeorm';
import Role from '../entity/Role';
import Permission from '../entity/Permission';
import { validationErrors } from '../utils/validation';

export enum RoleValidations {
    Create
}

async function create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationErrors(errors, req, res);

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
    
    await roleRepository.save(newRole).catch(e=>{
        return res.status(500).json({
            message: 'Error creating role'
        });
    })
    await permissionRepository.save(newPermisions).catch(e=>{
        return res.status(500).json({
            message: 'Error creating permission'
        });
    });

    return res.status(201).json({
        message: 'Role record created'
      });
}

export function roleValidation(type: RoleValidations) {
    switch (type) {
      case RoleValidations.Create:
        return [
            body('name').isAlphanumeric().withMessage('Value must be an alphanumeric'),
            body('description').isString().withMessage('Value must be a string'),
            body('permissions').not().isEmpty().withMessage('A role cant lack permissions'),
            body('permissions.*.name').isAlphanumeric().withMessage('Value must be an alphanumeric'),
            body('permissions.*.actions').not().isEmpty().withMessage('An entity cant lack actions'),
            body('permissions.*.actions.*').isAlphanumeric().withMessage('Values must be an email')
          ];
    }
  }

export default {create};

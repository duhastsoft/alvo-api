import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getManager } from 'typeorm';
import User from '../entity/User';
import Role from '../entity/Role';
import jwt from '../tools/token';
import bcrypt from '../tools/genHash';
import { validationErrors } from '../utils/validation';

export enum UserValidations {
  Login,
  Register
}

async function obtainAll(req: Request, res: Response) {
    res.status(200).send('User done');
  }

async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationErrors(errors, req, res);

  const userRepository = getManager().getRepository<User>(User);
  const doc = await userRepository.findOne({
    where: [
      {account:req.body.account},
      {email:req.body.email}
    ], relations: ['role']
  });
  if(doc){
    if(doc.status == 2){
      return res.status(403).json({
        message: 'Your account has been blocked for security measures'
      });
    }
    else{
      return jwt(req.body.password, doc).then(value=>{
        return res.status(value.status).json({
          message: value.message,
          token: value.token
        });
      }).catch(e=>{
        return res.status(401).json({
          message: 'JWT failed'
        });
      });
      
    }
  }
  return res.status(401).json({
    message: 'Authentication failed'
  });
}

async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationErrors(errors, req, res);

  const userRepository = getManager().getRepository<User>(User);
  const roleRepository = getManager().getRepository<Role>(Role);
  const doc = await userRepository.findOne({
    where: [
      {account:req.body.account},
      {email:req.body.email} 
    ]
  });
  const role = await roleRepository.findOne({name:req.body.role});
  if(!doc && role){
    const newUser = new User();
    newUser.account = req.body.account;
    newUser.email = req.body.email;
    newUser.role = role;

    const hash = bcrypt(req.body.password);
    if(hash){
      newUser.password = hash;
      return userRepository.save(newUser).then(saved =>{
        return res.status(201).json({
          message: 'User record created'
        });
      }).catch( e =>{
        return res.status(500).json({
          message: 'Error creating new user'
        });
      });
    }
    else{
      return res.status(500).json({
        message: 'Hash error'
      });
    }
    
  }
  else if(doc){
    return res.status(422).json({
      message: 'Credentials in use'
    });
  }
  else if(!role){
    return res.status(422).json({
      message: 'Role not found'
    });
  }
  return res.status(500).send('Error in register');
}

async function logout(req: Request, res: Response) {
  res.status(200).send('Logout here');
}

export function userValidation(type: UserValidations) {
  switch (type) {
    case UserValidations.Login:
      return [
        body(['account']).isAlphanumeric().withMessage('Value must be an alphanumeric'),
        body(['password']).isAlphanumeric().withMessage('Value must be an alphanumeric'),
        body('email').isEmail().withMessage('Values must be an email')
      ];
      case UserValidations.Register:
        return [
          body('account').isAlphanumeric().withMessage('Value must be an alphanumeric'),
          body('password').isAlphanumeric().withMessage('Value must be an alphanumeric'),
          body('role').isAlphanumeric().withMessage('Value must be an alphanumeric'),
          body('email').isEmail().withMessage('Values must be an email')
        ];
  }
}

export default {obtainAll, login, logout, register};
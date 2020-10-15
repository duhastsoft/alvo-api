import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import User from '../entity/User';
import Role from '../entity/Role';
import jwt from '../tools/token';
import bcrypt from '../tools/genHash';

async function obtainAll(req: Request, res: Response): Promise<void>  {
    res.status(200).send('User done');
  }

async function login(req: Request, res: Response): Promise<void> {

  const userRepository = getManager().getRepository<User>(User);
  const doc = await userRepository.findOne({
    where: [
      {account:req.body.account},
      {email:req.body.email}
    ], relations: ['role']
  });
  if(doc){
    if(doc.status == 2){
      res.status(403).json({
        message: 'Your account has been blocked for security measures'
      });
    }
    else{
      try {
        const response = await jwt(req.body.password, doc);
        res.status(response.status).json({
          message: response.message,
          token: response.token
        });
      } catch (error) {
        res.status(500).json({
          message: 'JWT error',
        });
      }
    }
  }
  else{
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
}

async function register(req: Request, res: Response): Promise<void> {

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
      try {
        await userRepository.save(newUser);
        res.status(201).json({
          message: 'User record created'
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error creating new user'
        });
      }
    }
    else{
      res.status(500).json({
        message: 'Hash error'
      });
    }
  }
  else if(doc){
    res.status(422).json({
      message: 'Credentials in use'
    });
  }
  else if(!role){
    res.status(422).json({
      message: 'Role not found'
    });
  }
  else{
    res.status(500).send('Error in register');
  }
}

async function logout(req: Request, res: Response): Promise<void> {
  res.status(200).send('Logout here');
}


export default {obtainAll, login, logout, register};
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User, { UserRole } from '../entity/User';
import jwt from '../tools/token';
import bcrypt from '../tools/genHash';

async function obtainAll(req: Request, res: Response): Promise<void> {
  res.status(200).send('User done');
}

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userRepository = getRepository(User);
  const doc = await userRepository.findOne({
    where: [{ account: req.body.account }, { email: req.body.account }],
    relations: ['role'],
  });
  if (doc) {
    if (doc.status == 2) {
      res.status(403).json({
        message: 'Your account has been blocked for security measures',
      });
    } else {
      try {
        const response = await jwt(req.body.password, doc);
        res.status(response.status).json({
          message: response.message,
          token: response.token,
        });
      } catch (error) {
        next(error);
      }
    }
  } else {
    res.status(401).json({
      message: 'Authentication failed',
    });
  }
}

async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userRepository = getRepository(User);
  try {
    const doc = await userRepository.findOne({
      where: [{ account: req.body.account }, { email: req.body.email }],
    });
    if (!doc) {
      const newUser = new User();
      newUser.account = req.body.account;
      newUser.email = req.body.email;
      newUser.role = UserRole[req.body.role];
      const hash = bcrypt(req.body.password);
      if (hash) {
        newUser.password = hash;
        await userRepository.save(newUser);
        res.status(201).json({
          message: 'User record created',
        });
      } else {
        res.status(500).json({
          message: 'Hash error please try again',
        });
      }
    } else if (doc) {
      res.status(422).json({
        message: 'Credentials in use',
      });
    } else {
      res.status(500).send('Error in register');
    }
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

async function logout(req: Request, res: Response): Promise<void> {
  res.status(200).send('Token invalidated');
}

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userRepository = getRepository(User);
  const { body, params } = req;
  try {
    const user = await userRepository.findOneOrFail(params.id);

    user.account = body.account ?? user.account;
    user.email = body.email ?? user.email;
    user.givenName = body.givenName ?? user.givenName;
    user.lastName = body.lastName ?? user.lastName;
    user.status = body.status ?? user.status;

    await userRepository.save(user);

    res.status(200).json({ data: user });
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const serviceRepository = getRepository(User);
  try {
    const result = await serviceRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: `User with id ${req.params.id} not found.` });
    }
  } catch (err) {
    next(err);
  }
}

export default { obtainAll, login, logout, register, update, remove };

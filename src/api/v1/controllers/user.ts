import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userRepository = getRepository(User);
    const { body, params } = req;
  
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
  try {
    const serviceRepository = getRepository(User);
  
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

export default { update, remove };

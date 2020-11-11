import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../entity/User';
import generatePassword from '../tools/genHash';
import environment from '../utils/environment';

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(User);
  const { account, password }: { account: string; password: string } = req.body;

  try {
    const user = await repository.findOne({ where: [{ account: account }, { email: account }] });

    if (!user) {
      res.status(400).json({ message: 'User not found' });
    } else if (user.status == 2) {
      res.status(400).json({ message: 'Your account has been blocked for security reasons' });
    } else {
      if (!(await user.checkIfPasswordMatches(password))) {
        res.status(400).json({ message: 'Password is incorrect' });
        return;
      }

      const token = jwt.sign({ id: user.id, role: user.role }, environment.encryption.jwt, {
        expiresIn: '6h',
      });

      res.status(200).json({ token });
    }
  } catch (err) {
    next(err);
  }
}

async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(User);

  const account = req.body.account as string;
  const email = req.body.email as string;
  const role = UserRole[req.body.role as keyof UserRole];
  const password = req.body.password as string;

  try {
    const userVerify = await repository.findOne({ where: [{ account }, { email }] });
    if (userVerify) {
      res
        .status(400)
        .json({ message: 'There is already an account with the email or username provided' });
    } else {
      const user = new User();
      user.account = account;
      user.email = email;
      user.role = role;
      user.password = generatePassword(password);

      await repository.save(user);

      res.status(201).json({
        user: {
          id: user.id,
          account: user.account,
          email: user.email,
        },
      });
    }
  } catch (err) {
    next(err);
  }
}

async function logout(req: Request, res: Response): Promise<void> {
  res.status(200).send('Token invalidated');
}

async function promoteToAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(User);
  try {
    const user = await repository.findOneOrFail(req.body.userId);
    if (user.role === UserRole.Admin || user.id === req.userData.id) {
      res.status(400).json({ message: 'User is an admin already' });
    } else {
      user.role = UserRole.Admin;
      await repository.save(user);
      res.status(200).json({ message: 'User promoted successfully' });
    }
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

async function demoteToCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(User);
  try {
    const user = await repository.findOneOrFail(req.body.userId);
    if (user.role === UserRole.Customer) {
      res.status(400).json({ message: 'User is a customer already' });
    } else if (user.id === req.userData.id) {
      res.status(400).json({ message: 'Cannot demote your own user' });
    } else {
      user.role = UserRole.Customer;
      await repository.save(user);
      res.status(200).json({ message: 'User demoted successfully' });
    }
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

export default { login, register, logout, promoteToAdmin, demoteToCustomer };

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

      const token = jwt.sign({ userId: user.id, role: user.role }, environment.encryption.jwt, {
        expiresIn: '1h',
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
      res.status(400).json({ message: 'There is already an account with the email provided' });
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

export default { login, register, logout };

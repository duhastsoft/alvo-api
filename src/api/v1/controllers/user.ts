import { Request, Response } from 'express';

async function obtainAll(req: Request, res: Response) {
    res.status(200).send('User done');
  }

async function login(req: Request, res: Response) {
  res.status(200).send('Login here');
}

async function logout(req: Request, res: Response) {
  res.status(200).send('Logout here');
}

export {obtainAll, login, logout};
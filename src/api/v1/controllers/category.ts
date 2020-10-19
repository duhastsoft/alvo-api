import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entity/Category';

async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(Category);
  try {
    const result = await repository.find();
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
}

export { getAll };

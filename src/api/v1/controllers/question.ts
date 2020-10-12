import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Question from '../entity/Question';

async function obtainAll(_req: Request, res: Response): Promise<void> {
  res.status(200).send('Question done');
}

async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const questionRepository = getRepository(Question);

  try {
    const result = await questionRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      res
        .status(404)
        .json({ message: `Question with id ${req.params.id} not found.` });
    }
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: 'Question record updated', data: req.body });
}

export default { obtainAll, remove, update };

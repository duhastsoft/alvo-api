import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import Question from '../entity/Question';

async function obtainAll(req: Request, res: Response) {
  res.status(200).send('Question done');
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const questionRepository = getManager().getRepository(Question);
  try {
    const result = await questionRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      res.status(404).json({ message: `Question with id ${req.params.id} not found.` });
    }
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response) {
  res.status(200).send('Question record updated');
}

export { obtainAll, remove, update };

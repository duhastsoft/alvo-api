import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { getManager } from 'typeorm';
import Question from '../entity/Question';
import { validationErrors } from '../utils/validation';

export enum QuestionValidations {
  Remove,
}

async function obtainAll(req: Request, res: Response) {
  res.status(200).send('Question done');
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return validationErrors(errors, req, res);

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

export function questionValidation(type: QuestionValidations) {
  switch (type) {
    case QuestionValidations.Remove:
      return [param('id').isInt({ gt: 0 }).withMessage('Value must be a positive integer')];
  }
}

export default { obtainAll, remove, update };

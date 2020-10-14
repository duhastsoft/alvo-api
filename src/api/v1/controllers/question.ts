import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entity/Category';
import Question from '../entity/Question';

async function obtainAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  const questionRepository = getRepository(Question);

  try {
    const result = await questionRepository.find();
    res.status(200).json({ length: result.length, data: result });
  } catch (err) {
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const questionRepository = getRepository(Question);

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

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const questionRepository = getRepository(Question);
  const { body, params } = req;
  try {
    const question = await questionRepository.findOneOrFail(params.id);

    if (body.categoryId) {
      const categoryRepository = getRepository(Category);
      const category = await categoryRepository.findOneOrFail(body.categoryId);
      question.category = category || question.category;
    }

    question.text = body.text ?? question.text;
    question.answer1 = body.answer1 ?? question.answer1;
    question.answer2 = body.answer2 ?? question.answer2;
    question.answer3 = body.answer3 ?? question.answer3;
    question.answer4 = body.answer4 ?? question.answer4;
    question.answer4 = body.answer4 ?? question.answer4;
    question.rightAnswer = body.rightAnswer ?? question.rightAnswer;
    question.image = body.image ?? question.image;

    await questionRepository.save(question);

    res.status(200).json({ data: question });
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

export default { obtainAll, remove, update };

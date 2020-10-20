import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Question from '../entity/Question';

async function getCategoryQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = parseInt(req.query.category?.toString() || '1');
    const limit = parseInt(req.query.limit?.toString() || '20');
    const quiz = await getQuestionsByCategory(category, limit);
    res.status(200).json({ data: quiz });
  } catch (err) {
    next(err);
  }
}

async function getQuestionsByCategory(category: number | null, limit: number) {
  const repository = getRepository(Question);
  try {
    let query = repository.createQueryBuilder('question');

    if (category) {
      query = query.where('question."categoryId" = :categoryId', { categoryId: category });
    }
    const questions = await query.orderBy('random()').limit(limit).getMany();
    return questions;
  } catch (err) {
    console.log(err);
    const questions: Question[] = [];
    return questions;
  }
}

export { getCategoryQuiz };

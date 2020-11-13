import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entity/Category';
import Exam from '../entity/Exam';
import ExamQuestion from '../entity/ExamQuestion';
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

async function getVmtQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const repository = getRepository(Category);
    const categories = (await repository.find()).map((category) => category.id);
    const limit = 10;

    const quiz: Question[] = [];
    for (const category of categories) {
      const results = await getQuestionsByCategory(category, limit);
      quiz.push(...results);
    }
    res.status(200).json({ data: quiz });
  } catch (err) {
    next(err);
  }
}

async function getFreeQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = parseInt(req.query.limit?.toString() || '20');

    const quiz = await getQuestionsByCategory(null, limit);

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
    const questions: Question[] = [];
    return questions;
  }
}

async function submitExam(req: Request, res: Response, next: NextFunction): Promise<void> {
  const examRepository = getRepository(Exam);
  const examQuestionRepo = getRepository(ExamQuestion);

  try {
    const questions: {
      id: number;
      selectedAnswer: number;
      rightAnswer: number;
    }[] = req.body.questions;

    const totalRightAnswers = questions.reduce(
      (acc, el) => (el.rightAnswer === el.selectedAnswer ? acc + 1 : acc),
      0
    );

    const exam = new Exam();
    exam.startTime = req.body.startTime;
    exam.endTime = req.body.endTime;
    exam.examType = req.body.examType;
    exam.userId = req.userData.id;
    exam.category = req.body.category;
    exam.calculateGrade(totalRightAnswers, questions.length);
    await examRepository.save(exam);

    const examQuestions = questions.map((question) => {
      const examQuestion = new ExamQuestion();
      examQuestion.examId = exam.id;
      examQuestion.questionId = question.id;
      examQuestion.selectedAnswer = question.selectedAnswer;
      examQuestion.rightAnswer = question.rightAnswer;
      return examQuestion;
    });

    await examQuestionRepo.save(examQuestions);

    res.status(200).json({ data: exam });
  } catch (err) {
    if (err.constructor.name === 'EntityNotFoundError') res.status(404);
    next(err);
  }
}

async function getExamHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  const repository = getRepository(Exam);
  try {
    const exams = await repository.find({
      where: {
        userId: req.userData.id,
      },
      order: {
        id: 'DESC',
      },
      take: req.query.limit as number | undefined,
    });

    res.status(200).json({ data: exams });
  } catch (err) {
    next(err);
  }
}

export { getCategoryQuiz, getVmtQuiz, getFreeQuiz, submitExam, getExamHistory };

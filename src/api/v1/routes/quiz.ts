import { Router } from 'express';
import * as controller from '../controllers/quiz';
import authenticate from '../middlewares/authentication';
import { examHistory, examSchema, testQuerySchema } from '../validation/quiz-schema';
import { validateBody, validateQuery } from '../validation/validation';

const router = Router();

router.get('/category', validateQuery(testQuerySchema), controller.getCategoryQuiz);
router.get('/vmt', controller.getVmtQuiz);
router.get('/free', validateQuery(testQuerySchema), controller.getFreeQuiz);
router.get('/history', authenticate, validateQuery(examHistory), controller.getExamHistory);

router.post('/', authenticate, validateBody(examSchema), controller.submitExam);

export default router;

import { Router } from 'express';
import * as controller from '../controllers/quiz';
import authenticate from '../middlewares/authentication';
import { testQuerySchema } from '../validation/quiz-schema';
import { validateQuery } from '../validation/validation';

const router = Router();

router.get('/category', validateQuery(testQuerySchema), controller.getCategoryQuiz);
router.get('/vmt', controller.getVmtQuiz);
router.get('/free', validateQuery(testQuerySchema), controller.getFreeQuiz);
router.post('/', authenticate, controller.submitExam);

export default router;

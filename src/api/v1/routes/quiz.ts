import { Router } from 'express';
import * as controller from '../controllers/quiz';
import { testQuerySchema } from '../validation/quiz-schema';
import { validateQuery } from '../validation/validation';

const router = Router();

router.get('/', validateQuery(testQuerySchema), controller.getCategoryQuiz);

export default router;

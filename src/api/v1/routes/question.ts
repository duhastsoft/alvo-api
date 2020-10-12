import express from 'express';
import controller from '../controllers/question';
import * as validator from '../validation/question-validator';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/', controller.obtainAll);
// PUT ENDPOINTS
router.put(
  '/:id',
  validateParams(validator.paramIdSchema),
  validateBody(validator.createSchema),
  controller.update
);
// DELET ENDPOINTS
router.delete(
  '/:id',
  validateParams(validator.paramIdSchema),
  controller.remove
);

export default router;

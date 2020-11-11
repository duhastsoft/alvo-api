import express from 'express';
import controller from '../controllers/question';
import { UserRole } from '../entity/User';
import authenticate from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import * as schemas from '../validation/question-schemas';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/', authenticate, authorize([UserRole.Admin]), controller.obtainAll);
router.get(
  '/:id',
  authenticate,
  authorize([UserRole.Admin]),
  validateParams(schemas.paramId),
  controller.findById
);

// POST ENDPOINTS
router.post(
  '/',
  authenticate,
  authorize([UserRole.Admin]),
  validateBody(schemas.create),
  controller.create
);

// PUT ENDPOINTS
router.put(
  '/:id',
  authenticate,
  authorize([UserRole.Admin]),
  validateParams(schemas.paramId),
  validateBody(schemas.create),
  controller.update
);

// DELETE ENDPOINTS
router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.Admin]),
  validateParams(schemas.paramId),
  controller.remove
);

export default router;

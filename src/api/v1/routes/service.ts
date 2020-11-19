import express from 'express';
import controller from '../controllers/service';
import { UserRole } from '../entity/User';
import authenticate from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import * as schemas from '../validation/service-schemas';
import { validateBody, validateParams, validateQuery } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/all', controller.obtainAll);
router.get('/search', validateQuery(schemas.queryName), controller.findByName);
router.get('/:id', validateParams(schemas.paramId), controller.findById);

// POST ENDPOINTS
router.post(
  '/',
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

import express from 'express';
import controller from '../controllers/user';
import * as schemas from '../validation/user-schemas';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// PUT ENDPOINTS
router.put(
  '/:id',
  validateParams(schemas.paramId),
  validateBody(schemas.updateUser),
  controller.update
);

// DELETE ENDPOINTS
router.delete('/:id', validateParams(schemas.paramId), controller.remove);

export default router;

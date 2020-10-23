import express from 'express';
import controller from '../controllers/role';
import * as schemas from '../validation/role-schemas';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/all', controller.obtainAll);

// POST ENDPOINTS
router.post('/', validateBody(schemas.create), controller.create);

// PUT ENDPOINTS
router.put(
    '/:id',
    validateParams(schemas.paramId),
    validateBody(schemas.create),
    controller.update
  );
  
// DELETE ENDPOINTS
router.delete('/:id', validateParams(schemas.paramId), controller.remove);

export default router;
import express from 'express';
import controller from '../controllers/service-category';
import * as schemas from '../validation/service-category-schemas';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/all', controller.obtainAllCategories);
router.get('/expanded', controller.obtainAllServices);
router.get('/:id',  validateParams(schemas.paramId),  controller.findById);

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
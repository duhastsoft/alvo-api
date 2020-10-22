import express from 'express';
import controller from '../controllers/service';
import * as schemas from '../validation/service-schemas';
import { validateBody, validateQuery } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/all', controller.obtainAll);
router.get('/search', validateQuery(schemas.queryName),  controller.findByName);

// POST ENDPOINTS
router.post('/', validateBody(schemas.create), controller.create);

export default router;
import express from 'express';
import controller from '../controllers/service-category';
import * as schemas from '../validation/service-category-schemas';
import { validateBody } from '../validation/validation';

const router = express.Router();

// POST ENDPOINTS
router.post('/', validateBody(schemas.create), controller.create);

export default router;
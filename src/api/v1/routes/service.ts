import express from 'express';
import controller from '../controllers/service';
import * as schemas from '../validation/service-schemas';
import { validateBody } from '../validation/validation';

const router = express.Router();

// POST ENDPOINTS
router.post('/', validateBody(schemas.create), controller.create);

export default router;
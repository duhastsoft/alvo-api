import express from 'express';
import controller from '../controllers/role';
import * as schemas from '../validation/role-schemas';
import { validateBody } from '../validation/validation';

const router = express.Router();

// POST ENDPOINTS
router.post('/', validateBody(schemas.create), controller.create);

export default router;
import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

router.get('/', controller.test);

export default router;
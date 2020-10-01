import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

router.get('/', controller.obtainAll);
router.post('/login', controller.login);

export default router;
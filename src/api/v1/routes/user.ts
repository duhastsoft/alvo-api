import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

//GET ENDPOINTS
router.get('/', controller.obtainAll);
//POST ENDPOINTS
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
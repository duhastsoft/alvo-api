import express from 'express';
import controller from '../controllers/user';
import tokenVerify from '../middlewares/tokenVerification';
import accessVerify from '../middlewares/accessVerification';
import * as schemas from '../validation/user-schemas';
import { validateBody } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/', controller.obtainAll);
// POST ENDPOINTS
router.post('/login', validateBody(schemas.createToken), controller.login);
router.post('/register', validateBody(schemas.createUser), controller.register);
router.post('/logout',tokenVerify, accessVerify('read', 'user'), controller.logout);

export default router;

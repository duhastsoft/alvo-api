import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authenticate from '../middlewares/authentication';
import { createToken, createUser } from '../validation/user-schemas';
import { validateBody } from '../validation/validation';

const router = Router();

// POST ENDPOINTS
router.post('/login', validateBody(createToken), authController.login);
router.post('/register', validateBody(createUser), authController.register);
router.post('/logout', authenticate, authController.logout);

export default router;

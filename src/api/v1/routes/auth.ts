import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { UserRole } from '../entity/User';
import authenticate from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import authSchema from '../validation/auth.schema';
import { validateBody } from '../validation/validation';

const router = Router();

// POST ENDPOINTS
router.post('/login', validateBody(authSchema.createToken), authController.login);
router.post('/register', validateBody(authSchema.createUser), authController.register);
router.post('/logout', authenticate, authController.logout);
router.post(
  '/promote',
  authenticate,
  authorize([UserRole.Admin]),
  validateBody(authSchema.updateRole),
  authController.promoteToAdmin
);
router.post(
  '/demote',
  authenticate,
  authorize([UserRole.Admin]),
  validateBody(authSchema.updateRole),
  authController.demoteToCustomer
);

export default router;

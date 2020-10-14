import express from 'express';
import controller, {UserValidations, userValidation} from '../controllers/user';
import tokenVerify from '../middlewares/tokenVerification';
import accessVerify from '../middlewares/accessVerification';

const router = express.Router();

// GET ENDPOINTS
router.get('/', controller.obtainAll);
// POST ENDPOINTS
router.post('/login', userValidation(UserValidations.Login), controller.login);
router.post('/register', userValidation(UserValidations.Register), controller.register);
router.post('/logout',tokenVerify, accessVerify('read', 'user'), controller.logout);

export default router;

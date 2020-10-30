import express from 'express';
import controller from '../controllers/user';
import tokenVerify from '../middlewares/token-verification';
import * as schemas from '../validation/user-schemas';
import { validateBody, validateParams } from '../validation/validation';

const router = express.Router();

// GET ENDPOINTS
router.get('/all', controller.obtainAll);
// POST ENDPOINTS
router.post('/login', validateBody(schemas.createToken), controller.login);
router.post('/register', validateBody(schemas.createUser), controller.register);
router.post('/logout', tokenVerify, controller.logout);

// PUT ENDPOINTS
router.put(
    '/:id',
    validateParams(schemas.paramId),
    validateBody(schemas.updateUser),
    controller.update
  );
  
// DELETE ENDPOINTS
router.delete('/:id', validateParams(schemas.paramId), controller.remove);

export default router;

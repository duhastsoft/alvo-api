import express from 'express';
import controller, {roleValidation, RoleValidations} from '../controllers/role';

const router = express.Router();

// POST ENDPOINTS
router.post('/', roleValidation(RoleValidations.Create), controller.create);

export default router;
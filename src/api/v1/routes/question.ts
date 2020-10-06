import express from 'express';
import controller, { questionValidation, QuestionValidations } from '../controllers/question';

const router = express.Router();

// GET ENDPOINTS
router.get('/', controller.obtainAll);
// PUT ENDPOINTS
router.put('/:id', controller.update);
// DELET ENDPOINTS
router.delete('/:id', questionValidation(QuestionValidations.Remove), controller.remove);

export default router;

import express from 'express';
import * as controller from '../controllers/question';

const router = express.Router();

//GET ENDPOINTS
router.get('/', controller.obtainAll);
//PUT ENDPOINTS
router.put('/:id', controller.update);
//DELET ENDPOINTS
router.delete('/:id', controller.remove);

export default router;
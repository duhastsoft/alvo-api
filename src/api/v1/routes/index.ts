import express from 'express';
import users from './user'
import questions from './question';

const router = express.Router();

router.use('/user', users);
router.use('/question', questions);

export default router;
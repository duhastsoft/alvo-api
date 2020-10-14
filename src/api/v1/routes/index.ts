import express from 'express';
import users from './user';
import questions from './question';
import roles from './role';

const router = express.Router();

router.use('/user', users);
router.use('/question', questions);
router.use('/role', roles);

export default router;

import express from 'express';
import users from './user';
import questions from './question';
import roles from './role';
import category from './category';

const router = express.Router();

router.use('/user', users);
router.use('/category', category);
router.use('/question', questions);
router.use('/role', roles);

export default router;

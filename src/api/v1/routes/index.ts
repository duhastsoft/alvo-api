import express from 'express';
import category from './category';
import questions from './question';
import quiz from './quiz';
import roles from './role';
import users from './user';
import serviceCategories from './service-category'

const router = express.Router();

router.use('/user', users);
router.use('/category', category);
router.use('/question', questions);
router.use('/quiz', quiz);
router.use('/role', roles);
router.use('/service-category', serviceCategories);

export default router;

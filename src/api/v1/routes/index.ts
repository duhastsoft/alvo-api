import express from 'express';
import category from './category';
import questions from './question';
import quiz from './quiz';
import users from './user';
import serviceCategories from './service-category';
import service from './service';

const router = express.Router();

router.use('/user', users);
router.use('/category', category);
router.use('/question', questions);
router.use('/quiz', quiz);
router.use('/service-category', serviceCategories);
router.use('/service', service);

export default router;

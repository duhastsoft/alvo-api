import express from 'express';
import auth from './auth';
import category from './category';
import questions from './question';
import quiz from './quiz';
import service from './service';
import serviceCategories from './service-category';
import users from './user';

const router = express.Router();

router.use(auth);
router.use('/user', users);
router.use('/category', category);
router.use('/question', questions);
router.use('/quiz', quiz);
router.use('/service-category', serviceCategories);
router.use('/service', service);

export default router;

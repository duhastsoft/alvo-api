import express from 'express';
import users from './user'

const router = express.Router();

router.use('/user', users);

export default router;
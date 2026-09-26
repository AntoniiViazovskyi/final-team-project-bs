import { Router } from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const userRouter = Router();

userRouter.get('/me', authenticate, getUserProfile);

export default userRouter;

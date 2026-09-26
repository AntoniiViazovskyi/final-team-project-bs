import { Router } from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserProfile,
  getPublicUserProfile,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/me', authenticate, getUserProfile);
userRouter.get('/:userId', getPublicUserProfile);

export default userRouter;

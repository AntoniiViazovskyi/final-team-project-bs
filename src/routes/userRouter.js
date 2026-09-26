import { Router } from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const userRouter = Router();

userRouter.get('/me', authenticate, getUserProfile);
userRouter.patch('/me', authenticate, updateUserProfile);

export default userRouter;

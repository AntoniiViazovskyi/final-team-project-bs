import { celebrate } from 'celebrate';
import { Router } from 'express';

import { registerUser } from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';

const authRoutes = Router();

authRoutes.post(
  '/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

export default authRoutes;

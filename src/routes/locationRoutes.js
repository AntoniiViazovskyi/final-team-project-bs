import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createLocation,
  getLocationById,
  updateLocation,
} from '../controllers/locationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createLocationSchema,
  updateLocationSchema,
} from '../validations/locationValidation.js';

const locationRoutes = Router();

locationRoutes.get('/:locationId', getLocationById);

locationRoutes.post(
  '/',
  authenticate,
  celebrate(createLocationSchema, { abortEarly: false }),
  createLocation,
);

locationRoutes.patch(
  '/:locationId',
  authenticate,
  celebrate(updateLocationSchema, { abortEarly: false }),
  updateLocation,
);

export default locationRoutes;

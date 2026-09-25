import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getAllLocationsSchema } from '../validations/locationsValidation.js';
import { getAllLocations } from '../controllers/locationsController.js';

const locationsRoutes = Router();

locationsRoutes.get('/', celebrate(getAllLocationsSchema), getAllLocations);

export default locationsRoutes;

import { Router } from 'express';
import { getLocationById } from '../controllers/locationController.js';

const locationRoutes = Router();

locationRoutes.get('/:locationId', getLocationById);

export default locationRoutes;

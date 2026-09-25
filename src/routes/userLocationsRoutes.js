import express from 'express';

import { getUserLocations } from './userLocationsController.js';

const router = express.Router();

router.get('/:userId/locations', getUserLocations);

export default router;
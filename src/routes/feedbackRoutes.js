import { Router } from 'express';

import { getLocationFeedbacks } from '../controllers/feedbackController.js';

const feedbackRoutes = Router();

feedbackRoutes.get('/', getLocationFeedbacks);

export default feedbackRoutes;

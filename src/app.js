import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import routes from './routes/index.js';

const app = express();

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(logger);
app.use(cors());
app.use(cookieParser());

app.use(routes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

export { app };

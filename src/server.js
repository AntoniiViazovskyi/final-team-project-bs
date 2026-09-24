import 'dotenv/config';

import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const PORT = process.env.PORT ?? 3000;

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

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

export const startServer = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app };

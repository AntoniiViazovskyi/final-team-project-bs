import 'dotenv/config';

import { app } from './app.js';

const PORT = process.env.PORT ?? 3000;

export const startServer = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

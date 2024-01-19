import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { DB } from './src/utils/database/database';
import { AuthRouter } from './src/rotuers/auth.router';
import { errorHandler } from './src/utils/middlewares/ErrorHandler';

const app = express();

if (DB.initialize()) {
  console.log('[MAIN]: Database connected');
} else {
  console.error('Cannot connect to database, please check configuration');
}

app.use(
  cors({
    origin: 'localhost:3000',
  })
);

app.use(json());

app.use(cookieParser());

app.use('/auth', AuthRouter);

app.use(errorHandler);
app.listen(process.env.APP_PORT, async () => {
  console.log(`[MAIN]: Listening on port ${process.env.APP_PORT}`);
});

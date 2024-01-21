import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import Log4js from './src/utils/logger';

import { AuthRouter } from './src/rotuers/auth.router';
import { errorHandler } from './src/utils/middlewares/ErrorHandler';

const app = express();
const logger = Log4js.getLogger('Main');

app.use(
  cors({
    origin: 'localhost:3000',
  })
);

app.use(json());

app.use(cookieParser());

app.use('/auth', AuthRouter);

app.use(errorHandler);
app.listen(
  parseInt(process.env.APP_PORT),
  process.env.APP_HOSTNAME,
  async () => {
    logger.info(
      `Listening on https://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`
    );
  }
);

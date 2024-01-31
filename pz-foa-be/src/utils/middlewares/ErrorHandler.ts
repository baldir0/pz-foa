import { NextFunction, Request, Response } from 'express';
import { AuthError, ErrorBase, ProductError } from '../errors';
import Log4js from '../logger';

const logger = Log4js.getLogger('ErrorHandler');

export const errorHandler = (
  err: ErrorBase,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  if (err instanceof AuthError || ProductError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(400).json({
    message: 'An error occured. Contact administrator for more information.',
  });
};

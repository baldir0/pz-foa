import { NextFunction, Request, Response } from 'express';
import {
  AuthError,
  AuthErrorInvalidInput,
  AuthErrorNotFound,
  AuthErrorUnauthorized,
  AuthErrorUserTaken,
  ProductErrorInsertionFailed,
  ProductErrorNotFound,
} from '../errors';
import Log4js from '../logger';

const logger = Log4js.getLogger('ErrorHandler');

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  if (err instanceof AuthErrorUnauthorized) {
    return res.status(401).json({ message: err.message });
  } else if (err instanceof (AuthErrorNotFound || ProductErrorNotFound)) {
    return res.status(404).json({ message: err.message });
  } else if (
    err instanceof (AuthErrorInvalidInput || ProductErrorInsertionFailed)
  ) {
    return res.status(400).json({ message: err.message });
  } else if (err instanceof AuthErrorUserTaken) {
    return res.status(409).json({ message: err.message });
  } else if (err instanceof AuthError) {
    return res.status(401).json({ message: 'Authorization error!' });
  }

  return res.status(400).json({
    message: 'An error occured. Contact administrator for more information.',
  });
};

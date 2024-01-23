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

  // if (err instanceof AuthErrorUnauthorized) {
  //   return res.status(401).json({ message: err.message });
  // } else if (err instanceof (AuthErrorNotFound || ProductErrorNotFound)) {
  //   return res.status(404).json({ message: err.message });
  // } else if (
  //   err instanceof (AuthErrorInvalidInput || ProductErrorInsertionFailed)
  // ) {
  //   return res.status(400).json({ message: err.message });
  // } else if (err instanceof AuthErrorUserTaken) {
  //   return res.status(409).json({ message: err.message });
  // } else if (err instanceof AuthError) {
  //   return res.status(401).json({ message: 'Authorization error!' });
  // }

  return res.status(400).json({
    message: 'An error occured. Contact administrator for more information.',
  });
};

import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

export const RouterGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }

  res.send('Access denied!');
};

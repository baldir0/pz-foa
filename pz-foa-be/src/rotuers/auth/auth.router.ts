import { Router } from 'express';
import { authService } from '../../Services/authService';
import { AuthError, AuthErrorNotFound } from '../../utils/errors';

import { RequestBodyValidator } from './../../utils/middlewares/RequestBodyValidator';

import { AuthLoginDTO } from './dto/authLogin.dto';
import { AuthRegisterDTO } from './dto/authRegister.dto';

const AuthRouter = Router();

AuthRouter.post(
  '/login',
  RequestBodyValidator(AuthLoginDTO),
  async (req, res, next) => {
    try {
      if (req.cookies.jwt) throw new AuthError();
      await authService.login(req.body, res);
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.get('/logout', async (req, res) => {
  if (!req.cookies.jwt) throw new AuthErrorNotFound();
  await authService.logout(req.cookies.jwt, res);
});

AuthRouter.post(
  '/register',
  RequestBodyValidator(AuthRegisterDTO),
  async (req, res) => {
    const { login, email, passwordHSW } = req.body;
    await authService.register(login, email, passwordHSW, res);
  }
);

export { AuthRouter };

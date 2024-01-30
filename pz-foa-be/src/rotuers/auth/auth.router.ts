import { Router } from 'express';
import { authService } from '../../Services/authService';
import { AuthError, AuthErrorNotFound } from '../../utils/errors';

import { RequestBodyValidator } from './../../utils/middlewares/RequestBodyValidator';

import { AuthLoginDTO } from './dto/authLogin.dto';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';
import { UserRegisterInterface } from 'src/Interfaces/user-interface';

const AuthRouter = Router();

AuthRouter.post(
  '/login',
  RequestBodyValidator(AuthLoginDTO),
  async (req, res, next) => {
    try {
      if (req.cookies.jwt) throw new AuthError();
      const result: serviceResult = await authService.login(req.body);

      res
        .status(result.status)
        .cookie('jwt', result.data.token.accessToken, {
          secure: false,
          domain: 'localhost',
          maxAge: result.data.token.expirationTime,
          httpOnly: true,
        })
        .json({ user: result.data.user, message: result.data.message });
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.get('/logout', async (req, res, next) => {
  try {
    if (!req.cookies.jwt) throw new AuthErrorNotFound();
    const result: serviceResult = await authService.logout(req.cookies.jwt);

    res
      .clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .status(result.status)
      .json({ message: result.data.message });
  } catch (err) {
    next(err);
  }
});

AuthRouter.post(
  '/register',
  RequestBodyValidator(AuthRegisterDTO),
  async (req, res, next) => {
    try {
      const registerData: UserRegisterInterface = req.body;
      await authService.register(registerData);
    } catch (err) {
      next();
    }
  }
);

export { AuthRouter };

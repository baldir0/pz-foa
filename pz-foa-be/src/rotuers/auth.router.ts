import { Router } from 'express';
import { loginDataInterface } from './../Interfaces/loginData-interface';
import { authService } from '../Services/authService';
import {
  AuthErrorInvalidLoginData,
  AuthErrorNotFound,
} from './../../src/utils/errors';

const AuthRouter = Router();

AuthRouter.post('/login', async (req, res) => {
  const loginData: loginDataInterface = req.body;
  if (!loginData.login || !loginData.email || !loginData.passwordHSW) {
    throw new AuthErrorInvalidLoginData();
  }
  await authService.login(loginData, res);
});

AuthRouter.get('/logout', async (req, res) => {
  if (!req.cookies.jwt) throw new AuthErrorNotFound();
  await authService.logout(req.cookies.jwt, res);
});

AuthRouter.post('/register', async (req, res) => {
  const { login, email, passwordHSW } = req.body;
  if (!login || !passwordHSW || !email) throw new AuthErrorInvalidLoginData();
  await authService.register(login, email, passwordHSW, res);
});

export { AuthRouter };

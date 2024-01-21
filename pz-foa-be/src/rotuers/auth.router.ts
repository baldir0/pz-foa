import { Router } from 'express';
import { loginDataInterface } from './../Interfaces/loginData-interface';
import { AuthService } from '../Services/auth/authService';
import {
  AuthError,
  AuthErrorInvalidInput,
  AuthErrorNotFound,
} from './../../src/utils/errors';
import messages from './../../src/data/en-EN.json';

const AuthRouter = Router();
const authService = new AuthService();

AuthRouter.post('/login', async (req, res) => {
  const loginData: loginDataInterface = req.body;
  if (!loginData.login || !loginData.email || !loginData.passwordHSW) {
    throw new AuthErrorInvalidInput(messages.ERROR.INVALID_LOGIN_DATA);
  }
  await authService.login(loginData, res);
});

AuthRouter.get('/logout', async (req, res) => {
  if (!req.cookies.jwt)
    throw new AuthErrorNotFound(messages.ERROR.UNAUTHORIZED_USER);
  await authService.logout(req.cookies.jwt, res);
});

AuthRouter.post('/register', async (req, res) => {
  const { login, email, passwordHSW } = req.body;
  if (!login || !passwordHSW || !email)
    throw new AuthErrorInvalidInput(messages.ERROR.INVALID_REGISTER_DATA);
  await authService.register(login, email, passwordHSW, res);
});

export { AuthRouter };

import { UserEntity } from '../Entities/user.entity';
import { DB } from '../utils/database/database';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { JWTPayload } from '../utils/passwd/jwt';
import {
  UserInterface,
  UserRegisterInterface,
} from '../Interfaces/user-interface';
import { loginDataInterface } from '../Interfaces/loginData-interface';
import { Response } from 'express';
import {
  AuthError,
  AuthErrorNotFound,
  AuthErrorUnauthorized,
  AuthErrorUserExists,
} from '../utils/errors';
import { hashPWD } from '../utils/passwd/hashPWD';
import messages from '../data/en-EN.json';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';

class AuthService {
  constructor(
    private userRepo: Repository<UserEntity> = DB.getRepository(UserEntity)
  ) {}

  private createToken(currentToken: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JWTPayload = { id: currentToken };
    const expiresIn = parseInt(process.env.AUTH_EXPIRATIONTIME);
    const accessToken = sign(payload, process.env.AUTH_SECRET, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async newToken(user: UserInterface): Promise<string> {
    let token = null;
    let isTaken = true;
    do {
      token = crypto.randomUUID();
      isTaken = (await this.userRepo.findOneBy({ token: token }))
        ? true
        : false;
    } while (isTaken);

    await this.userRepo.update({ id: user.id }, { token });
    return token;
  }

  public async login(loginData: loginDataInterface): Promise<serviceResult> {
    const { salt } = await this.userRepo.findOne({
      where: [{ login: loginData.login }, { email: loginData.email }],
      select: { salt: true },
    });

    const pass = await hashPWD(loginData.passwordHSW, salt);

    const user = await this.userRepo.findOne({
      where: [
        { login: loginData.login, passwordHSW: pass },
        { email: loginData.email, passwordHSW: pass },
      ],
    });
    if (!user) throw new AuthErrorNotFound();

    user.passwordHSW = null;
    const token = this.createToken(await this.newToken(user));

    return {
      status: 200,
      data: {
        token,
        user,
        message: messages.AUTH.LOGIN,
      },
    };
  }

  public async logout(token: string): Promise<serviceResult> {
    const user = await this.userRepo.findOneBy({ token });
    if (!user) throw new AuthErrorUnauthorized();
    return {
      status: 200,
      data: {
        message: messages.AUTH.LOGOUT,
      },
    };
  }

  public async register(
    registerData: UserRegisterInterface
  ): Promise<serviceResult> {
    let uuid = null;
    let isTaken = true;
    do {
      uuid = crypto.randomUUID();
      isTaken = (await this.userRepo.findOneBy({ id: uuid })) ? true : false;
    } while (isTaken);
    const salt = crypto.randomUUID();

    await this.userRepo.insert({
      id: uuid,
      login: registerData.login,
      email: registerData.email,
      passwordHSW: await hashPWD(registerData.passwordHSW, salt),
      salt,
      token: null,
    });
    return {
      status: 201,
      data: {
        message: messages.AUTH.USER_CREATED,
      },
    };
  }

  public async validate(reqToken: string): Promise<UserEntity | null> {
    try {
      if (!reqToken) throw new AuthErrorUnauthorized();

      const { id }: JWTPayload = verify(
        reqToken,
        process.env.AUTH_SECRET
      ) as JWTPayload;

      const user = await this.userRepo.findOne({
        where: { token: id },
      });

      return user;
    } catch {
      throw new AuthErrorUnauthorized();
    }
  }
}

export const authService = new AuthService();

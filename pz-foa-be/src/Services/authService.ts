import { UserEntity } from '../Entities/user.entity';
import { DB } from '../utils/database/database';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { JWTPayload } from '../utils/passwd/jwt';
import { UserInterface } from '../Interfaces/user-interface';
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

  public async login(loginData: loginDataInterface, res: Response) {
    try {
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

      user.passwordHSW = null;
      const token = this.createToken(await this.newToken(user));
      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          maxAge: parseInt(process.env.AUTH_EXPIRATIONTIME),
          httpOnly: true,
        })
        .status(200)
        .json({ user, message: messages.AUTH.LOGIN });
    } catch {
      throw new AuthErrorNotFound();
    }
  }

  public async logout(token: string, res: Response) {
    try {
      await this.userRepo.findOneBy({ token });
      return res
        .clearCookie('jwt', {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .status(200)
        .json(messages.AUTH.LOGOUT);
    } catch {
      throw new AuthError(messages.ERROR.USER_NOT_FOUND);
    }
  }

  public async register(
    login: string,
    email: string,
    password: string,
    res: Response
  ) {
    try {
      let uuid = null;
      let isTaken = true;
      do {
        uuid = crypto.randomUUID();
        isTaken = (await this.userRepo.findOneBy({ id: uuid })) ? true : false;
      } while (isTaken);
      const salt = crypto.randomUUID();

      await this.userRepo.insert({
        id: uuid,
        login,
        email,
        passwordHSW: await hashPWD(password, salt),
        salt,
        token: null,
      });
      res.status(201).json(messages.AUTH.USER_CREATED);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') throw new AuthErrorUserExists();
      throw new AuthError();
    }
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

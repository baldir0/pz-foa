import { UserEntity } from '../../Entities/user.entity';
import { DB } from '../../utils/database/database';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWTPayload } from '../../utils/passwd/jwt';
import { UserInterface } from '../../Interfaces/user-interface';
import { loginDataInterface } from '../../Interfaces/loginData-interface';
import { Response } from 'express';
import { AuthError, AuthErrorNotFound } from '../../utils/errors';
import { hashPWD } from '../../utils/passwd/hashPWD';
import messages from '../../../src/data/en-EN.json';

export class AuthService {
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
        select: {
          salt: true,
        },
        where: {
          [loginData.login ? 'login' : 'email']: loginData.login
            ? loginData.login
            : loginData.email,
        },
      });

      const user = await this.userRepo.findOneBy({
        [loginData.login ? 'login' : 'email']: loginData.login
          ? loginData.login
          : loginData.email,
        passwordHSW: await hashPWD(loginData.passwordHSW, salt),
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
    } catch (err) {
      throw new AuthErrorNotFound(messages.ERROR.UNAUTHORIZED_USER);
    }
  }

  public async logout(id: string, res: Response) {
    try {
      await this.userRepo.findOneBy({ id, token: null });
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

      const result = this.userRepo.insert({
        id: uuid,
        login,
        email,
        passwordHSW: await hashPWD(password, salt),
        salt,
        token: null,
      });
      console.log(result);
      res.status(201).json(messages.AUTH.USER_CREATED);
    } catch (err) {
      console.log(err);
      throw new AuthError(messages.ERROR.REGISTER_FAILED);
    }
  }
}

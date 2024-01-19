import { Strategy } from 'passport-jwt';
import { DB } from '../database/database';
import { UserEntity } from 'src/Entities/user.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';

export interface JWTPayload {
  id: string;
}

const tokenExtractor = (req: Request): null | string => {
  return req && req.cookies ? req.cookies.jwt ?? null : null;
};

export class JWTStrategy extends Strategy {
  userRepo: Repository<UserEntity>;
  constructor() {
    super({
      jwtFromRequest: tokenExtractor,
      secretOrKey: process.env.secretJwt,
    });
    this.userRepo = DB.getRepository(UserEntity);
  }

  async validate(payload: JWTPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done('ERROR: Empty payload!', null); // TODO: Add Error
    }

    const user = await this.userRepo.findOneBy({ token: payload.id });
    if (!user) {
      return done('ERROR: No such user!', null); // TODO: Add Error
    }

    return done(null, user);
  }
}

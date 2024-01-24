import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@entities/index';
import { JwtService } from '@/common/service';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: User): Promise<User> {
    //const refreshToken: string = req.get('authorization').split('Bearer ')[1];
    return this.jwtService.validateUser(payload);
  }
}
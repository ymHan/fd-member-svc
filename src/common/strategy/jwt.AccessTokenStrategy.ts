import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@entities/index';
import { JwtService } from '@/common/service';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: User): Promise<User | never> {
    return this.jwtService.validateUser(payload);
  }
}

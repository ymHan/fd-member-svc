import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Member } from '../member.entity';
import { JwtService } from '../service/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dev',
      ignoreExpiration: true,
    });
  }

  public validate(token: string): Promise<Member | never> {
    return this.jwtService.validateUser(token);
  }
}

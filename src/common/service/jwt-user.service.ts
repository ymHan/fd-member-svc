import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '@entities/account/user-account.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
  @InjectRepository(UserAccountEntity)
  private readonly repository: Repository<UserAccountEntity>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<UserAccountEntity> {
    return this.repository.findOne({ where: { email: decoded.email } });
  }

  public generateToken(user: UserAccountEntity): string {
    return this.jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.usertype });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}

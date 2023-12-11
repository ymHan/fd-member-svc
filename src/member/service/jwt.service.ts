import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
  @InjectRepository(Member)
  private readonly repository: Repository<Member>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<Member> {
    return this.repository.findOne(decoded.id);
  }

  public generateToken(auth: Member): string {
    return this.jwt.sign({ id: auth.id, name: auth.name, email: auth.email, rolesId: auth.rolesId });
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

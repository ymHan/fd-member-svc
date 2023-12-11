import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { SignUpRequestDto, SignInRequestDto, ValidateRequestDto } from '../member.dto';
import { Member } from '../member.entity';
import { SignInResponse, SignUpResponse, ValidateResponse } from '../member.pb';

@Injectable()
export class MemberService {
  @InjectRepository(Member)
  private readonly repository: Repository<Member>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async signup({ name, email, password, rolesId }: SignUpRequestDto): Promise<SignUpResponse> {
    let member: Member = await this.repository.findOne({ where: { email } });

    if (member) {
      return { status: HttpStatus.CONFLICT, error: ['Email already exists'] };
    }

    member = new Member();

    member.name = name;
    member.email = email;
    member.password = this.jwtService.encodePassword(password);
    member.rolesId = rolesId;

    await this.repository.save(member);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async signin({ email, password }: SignInRequestDto): Promise<SignInResponse> {
    const member: Member = await this.repository.findOne({ where: { email } });

    if (!member) {
      return { status: HttpStatus.NOT_FOUND, error: ['Email not found'], token: null };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, member.password);

    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }

    const token: string = this.jwtService.generateToken(member);

    return {
      token,
      status: HttpStatus.OK,
      error: null,
    };
  }

  public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Member = await this.jwtService.verify(token);

    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }
    const member: Member = await this.jwtService.validateUser(decoded);

    if (!member) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}

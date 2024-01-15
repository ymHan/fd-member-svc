import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { SignInRequestDto } from '@dto/index';
import { SignInResponse } from '@/proto';

import { AccountStates } from '@/model/enum';

@Injectable()
export class SignInService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async signin(payload: SignInRequestDto): Promise<SignInResponse> {
    const user: User = await this.userRepository.findOne({ where: { email: payload.email } });
    const isPasswordValid: boolean = this.jwtService.isPasswordValid(payload.password, user.password);

    // 없는 사용자
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Email not found',
        token: null,
        error: [HttpStatus.NOT_FOUND.toString()],
      };
    }

    // 이메일 인증을 하지 않은 사용자
    if (!user.isVerifiedEmail) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Email not verified',
        token: null,
        error: [HttpStatus.FORBIDDEN.toString()],
      };
    }

    // 비활성화된 사용자
    if (user.state === AccountStates.INACTIVE) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Account inactive',
        token: null,
        error: [HttpStatus.FORBIDDEN.toString()],
      };
    }

    // 비밀번호가 일치하지 않는다면...
    if (!isPasswordValid) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password does not match',
        token: null,
        error: [HttpStatus.UNAUTHORIZED.toString()],
      };
    }

    const token: string = this.jwtService.generateToken(user);

    return {
      status: HttpStatus.OK,
      message: 'OK',
      token,
      error: null,
    };
  }
}

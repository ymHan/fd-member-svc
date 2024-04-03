import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { SignInResponse, SignInRequest } from '@/proto';

import { AccountStates } from '@/model/enum';

@Injectable()
export class SignInService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async signin(payload: SignInRequest): Promise<SignInResponse> {
    const user: User = await this.userRepository.findOne({ where: { email: payload.email } });
    // 없는 사용자
    if (!user) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'Email not found',
        signType: null,
        data: [{ error: HttpStatus.NOT_FOUND.toString() }],
      };
    }

    // 이메일 인증을 하지 않은 사용자
    if (!user.isVerifiedEmail) {
      return {
        result: 'fail',
        status: HttpStatus.FORBIDDEN,
        message: 'Email not verified',
        signType: null,
        data: [{ error: HttpStatus.FORBIDDEN.toString() }],
      };
    }

    // 비활성화된 사용자
    if (user.state === AccountStates.INACTIVE) {
      return {
        result: 'fail',
        status: HttpStatus.FORBIDDEN,
        message: 'Account inactive',
        signType: null,
        data: [{ error: HttpStatus.FORBIDDEN.toString() }],
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(payload.password, user.password);
    // 비밀번호가 일치하지 않는다면...
    if (!isPasswordValid) {
      return {
        result: 'fail',
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password does not match',
        signType: null,
        data: [{ error: HttpStatus.UNAUTHORIZED.toString() }],
      };
    }

    const token: string = this.jwtService.generateToken(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      signType: 'email',
      data: [
        {
          id: user.id,
          email: user.email,
          name: user.name,
          nickname: user.nickname,
          pushreceive: user.pushreceive,
          emailreceive: user.emailreceive,
          token,
        },
      ],
    };
  }
}

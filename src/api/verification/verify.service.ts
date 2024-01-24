import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { VerifyEmailRequest, VerifyEmailResponse } from '@/proto';
import { AccountStates } from '@/model/enum';

@Injectable()
export class EmailVerificationService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const tmpValidate = await this.jwtService.verify(data.token);

    if (!tmpValidate) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: '유효하지 않은 토큰입니다.',
        data: null,
      };
    }

    await this.userRepository.update({ id: tmpValidate.id }, { isVerifiedEmail: true, state: AccountStates.ACTIVE });

    return {
      result: 'OK',
      status: HttpStatus.OK,
      message: '이메일 인증에 성공했습니다.',
      data: null,
    };
  }
}

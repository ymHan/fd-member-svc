import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetPasswordEntity } from '@entities/index';

import { FindPasswordRequest, FindPasswordResponse } from '@/proto';

@Injectable()
export class FindPasswordService {
  @InjectRepository(ResetPasswordEntity)
  private readonly resetPasswordRepository: Repository<ResetPasswordEntity>;

  public async findPassword(userData: FindPasswordRequest): Promise<FindPasswordResponse> {
    const auth = await this.resetPasswordRepository.findOne({ where: { email: userData.email, code: userData.code } });

    if (!auth) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'Please check your email address or verification code.',
        data: [],
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'Verified successfully. Please enter a new password.',
      data: [],
    };
  }
}

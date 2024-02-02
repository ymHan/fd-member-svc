import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/index';
import { CheckEmailDuplicationRequest, CheckEmailDuplicationResponse } from '@/proto';

@Injectable()
export class CheckEmailDuplicationService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async checkEmailDuplication(data: CheckEmailDuplicationRequest): Promise<CheckEmailDuplicationResponse> {
    const user: User = await this.userRepository.findOne({ where: { email: data.email } });

    if (user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'Email already exists',
        data: [],
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'available email address',
      data: [],
    };
  }
}

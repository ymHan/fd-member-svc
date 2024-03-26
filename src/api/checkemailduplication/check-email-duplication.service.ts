import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '@entities/index';
import { CheckEmailDuplicationRequest, CheckEmailDuplicationResponse } from '@/proto';

@Injectable()
export class CheckEmailDuplicationService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;

  public async checkEmailDuplication(data: CheckEmailDuplicationRequest): Promise<CheckEmailDuplicationResponse> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { email: data.email } });

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'available email address',
      data: [],
    };
  }
}

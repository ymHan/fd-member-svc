import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '@entities/index';
import { CheckEmailDuplicationRequest } from '@/proto';

@Injectable()
export class CheckEmailDuplicationService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;

  public async checkEmailDuplication(data: CheckEmailDuplicationRequest): Promise<any> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { email: data.email } });

    if (user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'duplicated email address',
        data: false,
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'available email address',
      data: true,
    };
  }
}

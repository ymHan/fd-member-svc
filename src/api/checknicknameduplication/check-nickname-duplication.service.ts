import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '@entities/index';
import { CheckNicknameDuplicationRequest, CheckNicknameDuplicationResponse } from '@/proto';

@Injectable()
export class CheckNicknameDuplicationService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;

  public async checkNicknameDuplication(data: CheckNicknameDuplicationRequest): Promise<CheckNicknameDuplicationResponse> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { nickname: data.nickname } });

    if (user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'Nickname already exists',
        data: [],
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'available nickname',
      data: [],
    };
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAccountEntity } from '@entities/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveMemberRequest, LeaveMemberResponse } from '@/proto';
import { AccountStates } from '@/model/enum';

@Injectable()
export class LeaveService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;

  public async leaveMember(payload: LeaveMemberRequest): Promise<LeaveMemberResponse> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { id: payload.id } });
    if (!user) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'Email not found',
      };
    }
    user.state = AccountStates.DELETED;
    await this.userRepository.save(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'success',
    };
  }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { CheckNicknameDuplicationResponse } from '@/proto';

@Injectable()
export class CheckNicknameDuplicationService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async checkNickname(nickname: string): Promise<CheckNicknameDuplicationResponse> {
    const user: User = await this.userRepository.findOne({ where: { nickname } });

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
      message: 'available nickname address',
      data: [],
    };
  }
}

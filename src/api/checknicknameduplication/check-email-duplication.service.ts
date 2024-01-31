import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { CheckEmailDuplicationRequest, CheckEmailDuplicationResponse } from '@/proto';

@Injectable()
export class CheckEmailDuplicationService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async checkEmail(data: CheckEmailDuplicationRequest): Promise<CheckEmailDuplicationResponse> {
    console.log(data.email);
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

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/index';
import * as dayjs from 'dayjs';
import { GetUserRequest, GetUserResponse } from '@/proto';

@Injectable()
export class getUserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getuser({ email }: GetUserRequest): Promise<GetUserResponse> {
    const user: User = await this.repository.findOne({ where: { email } });
    console.log(user)
    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          id: 1,
          name: '홍길동',
          email: 'onyxsard@gmail.com',
          role: 'admin',
          isVerifiedEmail: true,
          createdAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
    };
  }
}

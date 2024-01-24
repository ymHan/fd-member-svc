import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/index';
import * as dayjs from 'dayjs';
import { GetUserRequest, GetUserResponse } from '@/proto';

@Injectable()
export class userService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user: User = await this.repository.findOne({ where: { id } });

    if (!user) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: [
          {
            error: HttpStatus.NOT_FOUND.toString(),
          },
        ],
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerifiedEmail: user.isVerifiedEmail,
          createdAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
    };
  }
}

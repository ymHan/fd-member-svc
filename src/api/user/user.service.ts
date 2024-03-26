import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '@entities/index';
import * as dayjs from 'dayjs';
import {
  GetUserRequest,
  GetUserResponse,
  UpdateNicknameRequest,
  UpdateNicknameResponse,
  UpdatePushReceiveRequest,
  UpdatePushReceiveResponse,
  UpdateEmailReceiveRequest,
  UpdateEmailReceiveResponse,
} from '@/proto';

@Injectable()
export class userService {
  @InjectRepository(UserAccountEntity)
  private readonly repository: Repository<UserAccountEntity>;

  public async updatePushReceive(payload: UpdatePushReceiveRequest): Promise<UpdatePushReceiveResponse> {
    const user: UserAccountEntity = await this.repository.findOne({ where: { id: payload.id } });

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

    user.pushreceive = payload.pushreceive;
    await this.repository.save(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          result: true,
        },
      ],
    };
  }
  public async updateEmailReceive(payload: UpdateEmailReceiveRequest): Promise<UpdateEmailReceiveResponse> {
    const user: UserAccountEntity = await this.repository.findOne({ where: { id: payload.id } });

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

    user.emailreceive = payload.emailreceive;
    await this.repository.save(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          result: true,
        },
      ],
    };
  }

  public async updateNickname(payload: UpdateNicknameRequest): Promise<UpdateNicknameResponse> {
    const user: UserAccountEntity = await this.repository.findOne({ where: { id: payload.id } });

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

    user.nickname = payload.nickname;
    await this.repository.save(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          result: true,
        },
      ],
    };
  }

  public async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user: UserAccountEntity = await this.repository.findOne({ where: { id } });

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
          usertype: user.usertype,
          isVerifiedEmail: user.isVerifiedEmail,
          createdAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
    };
  }
}

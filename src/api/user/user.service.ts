import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity, FirebaseUserToken } from '@entities/index';
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
  UpdateDeviceTokenRequest,
  UpdateDeviceTokenResponse,
} from '@/proto';

@Injectable()
export class userService {
  @InjectRepository(UserAccountEntity)
  private readonly repository: Repository<UserAccountEntity>;

  @InjectRepository(FirebaseUserToken)
  private readonly deviceTokenRepository: Repository<FirebaseUserToken>;

  public async updatePushReceive(payload: UpdatePushReceiveRequest): Promise<UpdatePushReceiveResponse> {
    console.log(payload);
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
    console.log('user.pushreceive', user.pushreceive);
    const result = await this.repository.save(user);
    console.log('result', result);
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

  public async updateDeviceToken(payload: UpdateDeviceTokenRequest): Promise<UpdateDeviceTokenResponse> {
    const userToken: FirebaseUserToken = await this.deviceTokenRepository.findOne({ where: { userId: payload.userid } });

    if (!userToken) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'UserToken not found',
        data: [
          {
            error: HttpStatus.NOT_FOUND.toString(),
          },
        ],
      };
    }

    userToken.deviceToken = payload.devicetoken;
    await this.deviceTokenRepository.save(userToken);

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
}

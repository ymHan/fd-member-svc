import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetUserRequest,
  GetUserResponse,
  MEMBER_SERVICE_NAME,
  UpdateNicknameRequest,
  UpdateNicknameResponse,
  UpdatePushReceiveRequest,
  UpdatePushReceiveResponse,
  UpdateEmailReceiveResponse,
  UpdateEmailReceiveRequest,
  UpdateDeviceTokenRequest,
  UpdateDeviceTokenResponse,
} from '@/proto';
import { userService } from './user.service';

@Controller()
export class userController {
  @Inject(userService)
  private readonly service: userService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'GetUser')
  private getUser(payload: GetUserRequest): Promise<GetUserResponse> {
    return this.service.getUser(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'UpdateNickname')
  private updateNickname(payload: UpdateNicknameRequest): Promise<UpdateNicknameResponse> {
    return this.service.updateNickname(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'UpdatePushReceive')
  private updatePushReceive(payload: UpdatePushReceiveRequest): Promise<UpdatePushReceiveResponse> {
    return this.service.updatePushReceive(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'UpdateEmailReceive')
  private updateEmailReceive(payload: UpdateEmailReceiveRequest): Promise<UpdateEmailReceiveResponse> {
    return this.service.updateEmailReceive(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'UpdateDeviceToken')
  private updateDeviceToken(payload: UpdateDeviceTokenRequest): Promise<UpdateDeviceTokenResponse> {
    return this.service.updateDeviceToken(payload);
  }
}

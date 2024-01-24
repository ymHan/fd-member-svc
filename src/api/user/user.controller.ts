import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserRequest, GetUserResponse, MEMBER_SERVICE_NAME } from '@/proto';
import { userService } from './user.service';

@Controller()
export class userController {
  @Inject(userService)
  private readonly service: userService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'GetUser')
  private getUser(payload: GetUserRequest): Promise<GetUserResponse> {
    return this.service.getUser(payload);
  }
}

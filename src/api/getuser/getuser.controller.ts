import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserRequest, GetUserResponse, MEMBER_SERVICE_NAME } from '@/proto';
import { getUserService } from './getuser.service';

@Controller()
export class getUserController {
  @Inject(getUserService)
  private readonly service: getUserService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'GetUser')
  private getuser(payload: GetUserRequest): Promise<GetUserResponse> {
    return this.service.getuser(payload);
  }
}
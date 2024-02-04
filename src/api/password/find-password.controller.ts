import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, FindPasswordResponse, FindPasswordRequest } from '@/proto';
import { FindPasswordService } from './find-password.service';

@Controller()
export class FindPasswordController {
  @Inject(FindPasswordService)
  private readonly service: FindPasswordService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'FindPassword')
  private findPassword(payload: FindPasswordRequest): Promise<FindPasswordResponse> {
    return this.service.findPassword(payload);
  }
}

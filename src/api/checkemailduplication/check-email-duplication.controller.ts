import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, CheckEmailDuplicationResponse, CheckEmailDuplicationRequest } from '@/proto';
import { CheckEmailDuplicationService } from './check-email-duplication.service';

@Controller()
export class CheckEmailDuplicationController {
  @Inject(CheckEmailDuplicationService)
  private readonly service: CheckEmailDuplicationService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'checkEmailDuplication')
  private checkEmailDuplication(email: CheckEmailDuplicationRequest): Promise<CheckEmailDuplicationResponse> {
    return this.service.checkEmailDuplication(email);
  }
}

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, CheckEmailDuplicationRequest } from '@/proto';
import { CheckEmailDuplicationService } from './check-email-duplication.service';

@Controller()
export class CheckEmailDuplicationController {
  @Inject(CheckEmailDuplicationService)
  private readonly service: CheckEmailDuplicationService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'checkEmailDuplication')
  private checkEmailDuplication(email: CheckEmailDuplicationRequest): Promise<any> {
    return this.service.checkEmailDuplication(email);
  }
}

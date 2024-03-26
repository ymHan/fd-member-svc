import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, FindEmailResponse, FindEmailRequest } from '@/proto';
import { FindEmailService } from './find-email.service';

@Controller()
export class FindEmailController {
  @Inject(FindEmailService)
  private readonly findEmailService: FindEmailService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'FindEmail')
  private findEmail(payload: FindEmailRequest): Promise<FindEmailResponse> {
    return this.findEmailService.findEmail(payload);
  }
}

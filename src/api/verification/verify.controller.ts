import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, VerifyEmailRequest, VerifyEmailResponse } from '@/proto';
import { EmailVerificationService } from '@/api/verification/verify.service';

@Controller()
export class EmailVerifyController {
  @Inject(EmailVerificationService)
  private readonly service: EmailVerificationService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'VerifyEmail')
  private verifyEmail(token: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return this.service.verifyEmail(token);
  }
}

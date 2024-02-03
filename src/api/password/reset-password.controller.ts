import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, ResetPasswordRequest, ResetPasswordResponse } from '@/proto';
import { ResetPasswordService } from './reset-password.service';

@Controller()
export class ResetPasswordController {
  @Inject(ResetPasswordService)
  private readonly service: ResetPasswordService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'ResetPassword')
  private resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return this.service.resetPassword(payload);
  }
}

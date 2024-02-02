import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, UpdatePasswordResponse, UpdatePasswordRequest } from '@/proto';
import { UpdatePasswordService } from './update-password.service';

@Controller()
export class UpdatePasswordController {
  @Inject(UpdatePasswordService)
  private readonly service: UpdatePasswordService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'UpdatePassword')
  private updatePassword(payload: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    return this.service.updatePassword(payload);
  }
}
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignInRequestDto } from '@dto/index';
import { MEMBER_SERVICE_NAME, SignInResponse } from '@/proto';
import { SignInService } from './signin.service';

@Controller()
export class SignInController {
  @Inject(SignInService)
  private readonly service: SignInService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SignIn')
  private signin(payload: SignInRequestDto): Promise<SignInResponse> {
    return this.service.signin(payload);
  }
}

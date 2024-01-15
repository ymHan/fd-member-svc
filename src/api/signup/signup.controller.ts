import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignUpRequestDto } from '@dto/index';
import { MEMBER_SERVICE_NAME, SignUpResponse } from '@/proto';
import { SignUpService } from './signup.service';

@Controller()
export class SignUpController {
  @Inject(SignUpService)
  private readonly service: SignUpService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SignUp')
  private signup(payload: SignUpRequestDto): Promise<SignUpResponse> {
    return this.service.signup(payload);
  }
}

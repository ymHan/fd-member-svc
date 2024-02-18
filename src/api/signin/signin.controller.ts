import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, SignInResponse, SignInRequest } from '@/proto';
import { SignInService } from './signin.service';
import { JwtService } from '@/common/service';

@Controller()
export class SignInController {
  @Inject(SignInService)
  private readonly service: SignInService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SignIn')
  private signin(payload: SignInRequest): Promise<SignInResponse> {
    return this.service.signin(payload);
  }
}

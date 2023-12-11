import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignInRequestDto, SignUpRequestDto, ValidateRequestDto } from './auth.dto';
import { AUTH_SERVICE_NAME, SignUpResponse, SignInResponse, ValidateResponse } from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignUp')
  private signup(payload: SignUpRequestDto): Promise<SignUpResponse> {
    return this.service.signup(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignIn')
  private signin(payload: SignInRequestDto): Promise<SignInResponse> {
    return this.service.signin(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}

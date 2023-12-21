import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignInRequestDto, SignUpRequestDto, ValidateRequestDto } from './member.dto';
import { MEMBER_SERVICE_NAME, SignUpResponse, SignInResponse, ValidateResponse } from './member.pb';
import { MemberService } from './service/member.service';

@Controller()
export class MemberController {
  @Inject(MemberService)
  private readonly service: MemberService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SignUp')
  private signup(payload: SignUpRequestDto): Promise<SignUpResponse> {
    return this.service.signup(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SignIn')
  private signin(payload: SignInRequestDto): Promise<SignInResponse> {
    return this.service.signin(payload);
  }

  @GrpcMethod(MEMBER_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }


}

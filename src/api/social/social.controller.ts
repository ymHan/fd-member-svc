import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SocialService } from './social.service';
import { MEMBER_SERVICE_NAME, SignInResponse } from '@/proto';
import { SocialUserDto } from '@dto/index';

@Controller()
export class SocialController {
  @Inject(SocialService)
  private readonly socialService: SocialService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'SocialSignIn')
  private socialSignIn(payload: SocialUserDto): Promise<SignInResponse> {
    return this.socialService.socialSignIn(payload);
  }
}

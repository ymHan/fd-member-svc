import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SocialService } from './social.service';
import { MEMBER_SERVICE_NAME, SocialResponse } from '@/proto';
import { SocialUserDto } from '@dto/index';

@Controller()
export class SocialController {
  @Inject(SocialService)
  private readonly socialService: SocialService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'Social')
  private social(payload: SocialUserDto): Promise<SocialResponse> {
    return this.socialService.socialLogin(payload);
  }
}

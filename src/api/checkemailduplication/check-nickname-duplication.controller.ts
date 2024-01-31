import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, CheckNicknameDuplicationResponse } from '@/proto';
import { CheckNicknameDuplicationService } from './check-nickname-duplication.service';

@Controller()
export class CheckNicknameDuplicationController {
  @Inject(CheckNicknameDuplicationService)
  private readonly service: CheckNicknameDuplicationService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'CheckNicknameDuplication')
  private checknickname(nickname: string): Promise<CheckNicknameDuplicationResponse> {
    return this.service.checkNickname(nickname);
  }
}

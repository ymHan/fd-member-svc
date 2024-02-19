import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LeaveMemberRequest, LeaveMemberResponse, MEMBER_SERVICE_NAME } from '@/proto';
import { LeaveService } from '@/api/leave/leave.service';

@Controller()
export class LeaveController {
  @Inject(LeaveService)
  private readonly service: LeaveService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'LeaveMember')
  private leaveMember(payload: LeaveMemberRequest): Promise<LeaveMemberResponse> {
    return this.service.leaveMember(payload);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entities/index';

import { LeaveController } from '@/api/leave/leave.controller';
import { LeaveService } from '@/api/leave/leave.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}

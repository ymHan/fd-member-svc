import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entities/index';

import { CheckEmailDuplicationController } from '@/api/checkemailduplication/check-email-duplication.controller';
import { CheckEmailDuplicationService } from '@/api/checkemailduplication/check-email-duplication.service';


import { JwtService } from '@/common/service';
import { JwtAccessTokenStrategy } from '@/common/strategy';

import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CheckEmailDuplicationController],
  providers: [CheckEmailDuplicationService, JwtService, JwtAccessTokenStrategy],
})
export class CheckEmailDuplicationModule {}

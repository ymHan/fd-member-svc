import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entities/index';

import { CheckNicknameDuplicationController } from '@/api/checkemailduplication/check-nickname-duplication.controller';
import { CheckNicknameDuplicationService } from '@/api/checkemailduplication/check-nickname-duplication.service';

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
  controllers: [CheckNicknameDuplicationController],
  providers: [CheckNicknameDuplicationService, JwtService, JwtAccessTokenStrategy],
})
export class CheckEmailDuplicationModule {}

import { Module } from '@nestjs/common';

import { UserAccountEntity, ChannelAccountEntity, UserProfileAccountEntity } from '@entities/index';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignUpController } from '@/api/signup/signup.controller';
import { SignUpService } from '@/api/signup/signup.service';

import { JwtService } from '@/common/service';
import { JwtAccessTokenStrategy } from '@/common/strategy';

import { EmailService } from '@/utils/email/email.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([UserAccountEntity, ChannelAccountEntity, UserProfileAccountEntity]),
  ],
  controllers: [SignUpController],
  providers: [SignUpService, JwtService, JwtAccessTokenStrategy, EmailService],
})
export class SignUpModule {}

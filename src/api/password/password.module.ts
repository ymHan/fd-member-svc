import { Module } from '@nestjs/common';

import { User } from '@entities/index';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UpdatePasswordController } from '@/api/password/update-password.controller';
import { UpdatePasswordService } from '@/api/password/update-password.service';

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
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UpdatePasswordController],
  providers: [UpdatePasswordService, JwtService, JwtAccessTokenStrategy, EmailService],
})
export class PasswordModule {}
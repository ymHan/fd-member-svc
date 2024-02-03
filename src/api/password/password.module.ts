import { Module } from '@nestjs/common';

import { User, ResetPasswordEntity } from '@entities/index';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UpdatePasswordController } from '@/api/password/update-password.controller';
import { UpdatePasswordService } from '@/api/password/update-password.service';
import { FindEmailController } from '@/api/password/find-email.controller';
import { FindEmailService } from '@/api/password/find-email.service';
import { FindPasswordController } from '@/api/password/find-password.controller';
import { FindPasswordService } from '@/api/password/find-password.service';
import { ResetPasswordController } from '@/api/password/reset-password.controller';
import { ResetPasswordService } from '@/api/password/reset-password.service';

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
    TypeOrmModule.forFeature([User, ResetPasswordEntity]),
  ],
  controllers: [UpdatePasswordController, FindEmailController, FindPasswordController, ResetPasswordController],
  providers: [
    UpdatePasswordService,
    JwtService,
    JwtAccessTokenStrategy,
    EmailService,
    FindEmailService,
    FindPasswordService,
    ResetPasswordService,
  ],
})
export class PasswordModule {}

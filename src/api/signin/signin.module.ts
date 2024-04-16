import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccountEntity, FirebaseUserToken } from '@entities/index';

import { SignInController } from '@/api/signin/signin.controller';
import { SignInService } from '@/api/signin/signin.service';

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
    TypeOrmModule.forFeature([UserAccountEntity, FirebaseUserToken]),
  ],
  controllers: [SignInController],
  providers: [SignInService, JwtService, JwtAccessTokenStrategy],
})
export class SignInModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entities/index';

import { SignInController } from '@/api/signin/signin.controller';
import { SignInService } from '@/api/signin/signin.service';

import { JwtService } from '@/common/service';
import { JwtStrategy } from '@/common/strategy';

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
  controllers: [SignInController],
  providers: [SignInService, JwtService, JwtStrategy],
})
export class SignInModule {}

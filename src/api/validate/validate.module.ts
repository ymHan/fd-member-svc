import { Module } from '@nestjs/common';

import { User } from '@entities/index';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidateController } from '@/api/validate/validate.controller';
import { ValidateService } from '@/api/validate/validate.service';

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
  controllers: [ValidateController],
  providers: [ValidateService, JwtService, JwtAccessTokenStrategy],
})
export class ValidateModule {}

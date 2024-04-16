import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserAccountEntity, FirebaseUserToken } from '@entities/index';

import { userController } from '@/api/user/user.controller';
import { userService } from '@/api/user/user.service';

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
  controllers: [userController],
  providers: [userService, JwtService, JwtAccessTokenStrategy],
})
export class UserModule {}

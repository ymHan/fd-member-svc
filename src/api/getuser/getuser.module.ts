import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from '@entities/index';

import { getUserController } from '@/api/getuser/getuser.controller';
import { getUserService } from '@/api/getuser/getuser.service';

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
  controllers: [getUserController],
  providers: [getUserService, JwtService, JwtStrategy],
})
export class GetUserModule {}
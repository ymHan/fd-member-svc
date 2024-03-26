import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Social } from '@/model/entities';

import { SignUpService } from '../signup/signup.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@/common/service';
import { JwtAccessTokenStrategy } from '@/common/strategy';
import { EmailService } from '@/utils/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Social]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [SocialController],
  providers: [SocialService, SignUpService, JwtService, JwtAccessTokenStrategy, EmailService],
})
export class SocialModule {}

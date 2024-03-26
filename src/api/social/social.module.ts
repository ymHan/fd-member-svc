import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity, Social } from '@/model/entities';

import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@/common/service';
import { JwtAccessTokenStrategy } from '@/common/strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccountEntity, Social]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [SocialController],
  providers: [SocialService, JwtService, JwtAccessTokenStrategy],
})
export class SocialModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { Member } from './member.entity';
import { MemberService } from './service/member.service';
import { JwtService } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([Member]),
  ],
  controllers: [MemberController],
  providers: [MemberService, JwtService, JwtStrategy],
})
export class MemberModule {}

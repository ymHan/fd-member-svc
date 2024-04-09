import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignInModule } from '@/api/signin';
import { SignUpModule } from '@/api/signup';
import { ValidateModule } from '@/api/validate';
import { EmailModule } from '@/utils/email/email.module';
import { UserModule } from 'src/api/user';
import { VerifyEmailModule } from '@/api/verification';
import { CheckEmailDuplicationModule } from '@/api/checkemailduplication';
import { CheckNicknameDuplicationModule } from '@/api/checknicknameduplication';
import { PasswordModule } from '@/api/password/password.module';
import { LeaveModule } from '@/api/leave';
import { SocialModule } from '@/api/social';

import ormConfig = require('./config/ormconfig');

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig[0]),
    SignUpModule,
    SignInModule,
    ValidateModule,
    EmailModule,
    UserModule,
    VerifyEmailModule,
    CheckEmailDuplicationModule,
    CheckNicknameDuplicationModule,
    PasswordModule,
    LeaveModule,
    SocialModule,
  ],
})
export class AppModule {}

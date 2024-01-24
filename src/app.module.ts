import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignInModule } from '@/api/signin';
import { SignUpModule } from '@/api/signup';
import { ValidateModule } from '@/api/validate';
import { EmailModule } from '@/utils/email/email.module';
import { UserModule  } from 'src/api/user';
import { VerifyEmailModule } from '@/api/verification';

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
  ],
})
export class AppModule {}

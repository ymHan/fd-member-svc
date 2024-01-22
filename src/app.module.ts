import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignInModule } from '@/api/signin';
import { SignUpModule } from '@/api/signup';
import { ValidateModule } from '@/api/validate';
import { EmailModule } from '@/utils/email/email.module';
import { GetUserModule  } from '@/api/getuser';

import ormConfig = require('./config/ormconfig');

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig[0]), SignUpModule, SignInModule, ValidateModule, EmailModule, GetUserModule],
})
export class AppModule {}

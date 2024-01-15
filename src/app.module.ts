import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignInModule } from '@/api/signin';
import { SignUpModule } from '@/api/signup';
import { ValidateModule } from '@/api/validate';

import ormConfig = require('./config/ormconfig');

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig[0]), SignUpModule, SignInModule, ValidateModule],
})
export class AppModule {}

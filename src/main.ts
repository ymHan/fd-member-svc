import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './member/filter/http-exception.filter';
import { protobufPackage } from './member/member.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: protobufPackage,
      url: '0.0.0.0:50051',
      protoPath: join('node_modules/fd-proto/proto/member.proto'),
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}

bootstrap();

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DEFAULT_DB_HOST'),
  port: configService.get<number>('DEFAULT_DB_PORT'),
  username: configService.get('DEFAULT_DB_USER'),
  password: configService.get('DEFAULT_DB_PASSWORD'),
  database: configService.get('DEFAULT_DATABASE'),
  synchronize: false,
  entities: ['src/model/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

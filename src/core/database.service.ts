import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const ssl = this.configService.get('STAGE') === 'production';

    return {
      ssl,
      extra: {
        ssl: ssl ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: this.configService.get<string>('db.host'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.pass'),
      database: this.configService.get<string>('db.name'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

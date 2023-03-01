import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ApiModule } from './api/api.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ConnectionOptions => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: parseInt(configService.getOrThrow<string>('POSTGRES_PORT'), 10),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),

        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [__dirname + '/common/database/entities/*{.ts,.js}'],
        logging: configService.getOrThrow('PROFILE') === 'local' ? 'all' : ['error'],
      }),
    }),
    ApiModule,
    SocketModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}

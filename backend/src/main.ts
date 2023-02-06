import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
      transform: true,
    }),
  );

  morgan.token('body', req => JSON.stringify((req as unknown as { body: string }).body));
  app.use(morgan(':method :url :status :body > :res[content-length] bytes :response-time ms'));

  const config = new DocumentBuilder()
    .setTitle(`Transcendence API - ${configService.getOrThrow<string>('PROFILE')}`)
    .setDescription(`ft_transcendence api`)
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'ft_transcendence',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const originList = configService.get<string>('ORIGIN_LIST');
  const originRegex = configService.get<string>('ORIGIN_REGEX')
    ? new RegExp(configService.get<string>('ORIGIN_REGEX'))
    : '';
  app.enableCors({
    origin: [...originList.split(',').map(item => item.trim()), originRegex],
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(configService.getOrThrow<string>('PORT'));
}
bootstrap();

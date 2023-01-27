import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  morgan.token('body', req => JSON.stringify((req as unknown as { body: string }).body));
  app.use(morgan(':method :url :status :body > :res[content-length] bytes :response-time ms'));

  const config = new DocumentBuilder()
    .setTitle(
      `Transcendence API - ${configService.get('PROFILE') || 'dev'} (${configService.get('VERSION') || 'local'})`,
    )
    .setDescription(`ft_transcendence api`)
    .setVersion('0.1')
    .addCookieAuth(configService.get('ACCESS_TOKEN_KEY'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'ft_transcendence',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const originList = configService.get<string>('ORIGIN_LIST') || '';
  const originRegex = configService.get('ORIGIN_REGEX') ? new RegExp(configService.get('ORIGIN_REGEX')) : '';
  app.enableCors({
    origin: [...originList.split(',').map(item => item.trim()), originRegex],
    credentials: true,
  });

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();

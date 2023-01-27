import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  morgan.token('body', req => JSON.stringify((req as unknown as { body: string }).body));
  app.use(morgan(':method :url :status :body > :res[content-length] bytes :response-time ms'));

  const config = new DocumentBuilder()
    .setTitle(`Transcendence API - ${process.env.PROFILE || 'dev'} (${process.env.VERSION || 'local'})`)
    .setDescription(`ft_transcendence api`)
    .setVersion('0.1')
    .addCookieAuth(process.env.ACCESS_TOKEN_KEY)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'ft_transcendence',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const originList = process.env.ORIGIN_LIST || '';
  const originRegex = process.env.ORIGIN_REGEX ? new RegExp(process.env.ORIGIN_REGEX) : '';
  app.enableCors({
    origin: [...originList.split(',').map(item => item.trim()), originRegex],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ProfanityValidationPipe } from './validation.pipe/profanity.validation.pipe';
// import * as dotenv from 'dotenv'
// import * as process from 'process';
//
// const environment = process.env.NODE_ENV ?? ''
// dotenv.config({path: `environments/${environment}.env`})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(new ProfanityValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Avtoria')
    .setDescription('Sell Buy')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();

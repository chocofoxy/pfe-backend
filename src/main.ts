import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { GlobalFilter } from './global.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true });
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.useGlobalFilters(new GlobalFilter());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();

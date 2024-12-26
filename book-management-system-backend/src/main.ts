import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserFilter } from './user/user.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new UserFilter())
  app.useGlobalPipes(new ValidationPipe({transform:true}))
  app.useStaticAssets(join(__dirname, '../uploads'), {prefix: '/uploads'});
  app.enableCors()
  await app.listen(3000);
}
bootstrap();

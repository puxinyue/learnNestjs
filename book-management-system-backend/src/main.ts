import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserFilter } from './user/user.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UserFilter())
  app.useGlobalPipes(new ValidationPipe({transform:true}))
  app.enableCors()
  await app.listen(3000);
}
bootstrap();

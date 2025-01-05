import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './entity/TestEntity';
import { createClient } from 'redis';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-container',  // host.docker.internal
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'google_login',
    entities: [TestEntity],
    synchronize: true,
    logging: true,
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password'
    }
  })],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'REDIS_CLIENT',
    async useFactory() {
      const client = createClient({
          socket: {
              host: 'redis-container',
              port: 6379
          }
      });
      await client.connect();
      return client;
    }
  }],
})
export class AppModule { }

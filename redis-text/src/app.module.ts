import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        }
      });
      client.connect();
      return client
    },
  }],
})
export class AppModule { }

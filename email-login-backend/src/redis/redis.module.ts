import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';

@Global()
@Module({
  controllers: [RedisController],
  providers: [RedisService,{
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const client = createClient({
        socket: {
          host: '127.0.0.1',
          port: 6379,
        },
      });
      await client.connect();
      return client;
    },
  }],
  exports: [RedisService],
})
export class RedisModule {}

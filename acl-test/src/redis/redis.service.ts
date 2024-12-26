import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
   @Inject('REDIS_CLIENT') private redisClient: RedisClientType;

    async redisSet(key: string, list: Array<string>, ttl?: number) {
        if (ttl) {
            await this.redisClient.expire(key, ttl);
        } 
          for(let i = 0; i < list.length;i++) {
            await this.redisClient.lPush(key, list[i]);
        }
      
    }

    async redisGet(key: string) {
        return this.redisClient.lRange(key, 0, -1);
    }
}

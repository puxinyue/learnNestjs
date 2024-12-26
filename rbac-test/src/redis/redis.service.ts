import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private client: RedisClientType;

  async get(key: string) {
    return await this.client.lRange(key, 0, -1);
  }

  async set(key: string, list: Array<string>, ttl?: number) {
    list.forEach(async (item) => {
     return await this.client.lPush(key, item);
    });

   if (ttl) { // 到期时间
      return await this.client.expire(key, ttl);
    }

  }
}

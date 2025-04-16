import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';

@Injectable()
export class RedisService {

  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;


  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (let name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async keys(pattern: string) {
    return await this.redisClient.keys(pattern);
  }

}

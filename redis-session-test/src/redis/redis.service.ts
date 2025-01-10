import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT') client: RedisClientType;


  //redis 获取全部符合条件的数据
  async getAll(key: string) {
    return await this.client.hGetAll(key);
  }

  // redsi set 对象使用hset
  async set(key: string, value: any, ttl?: any) {
    for (let k in value) {
      await this.client.hSet(key, k, value[k]);
    }
    if (ttl) {
      await this.client.expire(key, ttl);
    }

  }


}

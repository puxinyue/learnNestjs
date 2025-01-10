import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService) redisService: RedisService;

  //set session
  async setSession(key: string, value: any, ttl = 30 * 60) {
    if (!key) {
      // 没有id情况下生成一个
      key = this.generateSid();
    }
    await this.redisService.set(`sid_${key}`, value, ttl);
    return key;
  }
  //get session
  async getSession<SessionType extends Record<string, any>>(key: string): Promise<SessionType>;
  async getSession(key: string) {
    return await this.redisService.getAll(`sid_${key}`);
  }
  // 生成随机sid
  generateSid() {
    return Math.random().toString().slice(2, 12);
  }

}

import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType

    async set(key: string, value: string|number, ttl?: number) {
        await this.redisClient.set(key, value);
        if(ttl){
            // 设置一个过期时间（TTL - Time To Live） 以秒为单位
            await this.redisClient.expire(key, ttl);
        }
    }

    async get(key: string) {
        return await this.redisClient.get(key);
    }
    
    
}

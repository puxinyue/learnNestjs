import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';

@Injectable()
export class AppService {
 
   @Inject('REDIS_CLIENT')
    private client:RedisClientType;

  async getHello() {
   const value = await this.client.keys('*')
  const list = await this.client.lRange('list',0,-1)
  console.log(list)
   console.log(value)
    return 'Hello World!';
  }
}

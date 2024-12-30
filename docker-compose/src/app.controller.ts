import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType } from 'redis';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Inject('REDIS_CLIENT')
  private readonly client: RedisClientType;

  @Get()
  async getHello() {
    const keys = await this.client.keys('*')
    console.log(keys)
    return this.appService.getHello();
  }
}

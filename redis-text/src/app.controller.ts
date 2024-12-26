import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheInterceptor } from './my-cache.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 async getHello() {
    return await this.appService.getHello();
  }
  @Get('set')
  @UseInterceptors(MyCacheInterceptor)
  async setHello(@Query('value') value:string){
      console.log('value',value)
     return 'abc777'
  }
}

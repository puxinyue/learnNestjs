import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RedisClientType } from 'redis';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject('REDIS_CLIENT')
  private client:RedisClientType;

  @Inject(HttpAdapterHost)
  private httpAdapterHost: HttpAdapterHost;

 async intercept(context: ExecutionContext, next: CallHandler) {
      const request = context.switchToHttp().getRequest();
      const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);
     const value = await this.client.get(key)
     if(!value){
         return next.handle().pipe(tap((data)=>{
              this.client.set(key,data)
         }))
     }else{
      return of(value)
     }
  }
}

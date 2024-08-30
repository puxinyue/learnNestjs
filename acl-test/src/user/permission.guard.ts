import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';


@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService

  @Inject(Reflector)
  private readonly reflector: Reflector
  
  @Inject(RedisService)
  private readonly redisService: RedisService

 async canActivate(context: ExecutionContext): Promise<boolean> {
     const request = context.switchToHttp().getRequest();
     const user = request.session.user;
     if(!user){
       throw new UnauthorizedException('用户未登录');
     }
    let permissions =  await this.redisService.redisGet(`user_${user.username}_permissions`)
    if(permissions.length==0){
      const findUser =  await this.userService.findByUsername(user.username)
      permissions = findUser.permissions.map(role => role.name)
      await this.redisService.redisSet(`user_${user.username}_permissions`,permissions,60*30)
    }

   
    const permission = this.reflector.get<string>('permission', context.getHandler());
   console.log('====>',permission)
   console.log(permissions)
    if(permissions?.some(role => role == permission)){
       return true;
    }else{
      throw new UnauthorizedException('用户无该接口权限');
    }
  }
}

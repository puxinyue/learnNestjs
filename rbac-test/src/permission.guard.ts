import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(UserService)
  private readonly userService;

  @Inject(Reflector)
  private readonly reflector;

  @Inject(RedisService)
  private readonly redisService;

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    console.log('====>',user?.roles)
    if(!user?.roles){
      return true
    }
    
   let redisPermissions  = await this.redisService.get(`${user.username}_permissions`)
   if(redisPermissions?.length==0||!redisPermissions){
      const roles = await this.userService.findRolesByIds(user.roles?.map((item)=>item.id));
     redisPermissions = roles?.reduce((total,cur)=>{
          total = cur.permissions
        return total
      },[])
    
      await this.redisService.set(`${user.username}_permissions`,redisPermissions?.map((item)=>item.name),60)
   }
     
    const requirePermission = this.reflector.getAllAndOverride('require-permission', [ context.getClass(),context.getHandler()]);

   console.log('asdasd',redisPermissions)
   console.log(requirePermission)
   for (let i = 0; i < requirePermission.length; i++) {
     const item = requirePermission[i];
     const isHas = redisPermissions?.find((per)=>per === item)
     if(!isHas){
       throw new UnauthorizedException('没有权限')
     }
    }
    
    return true;
  }
}

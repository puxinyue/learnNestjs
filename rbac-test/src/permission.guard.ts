import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(Reflector)
  private readonly reflector;

  @Inject(UserService)
  private readonly userService;

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
   await this.userService.findOne(user.id);
    const requireRole =  await this.reflector.getAllAndOverride('requireRole', [context.getHandler(), context.getClass()]);

    if(!requireRole){
      return true;
    }
    return true;
  }
}

import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService;
 
  @Inject(Reflector)
  private readonly reflector;

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requireRole = this.reflector.getAllAndOverride('requireRole', [context.getHandler(), context.getClass()]);
    
   if(!requireRole){
      return true
   }
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')?.[1];
    if(!token){
      throw new UnauthorizedException('用户未登录')
    }
    try {
      const user = await this.jwtService.verify(token);
      request.user = user;
      return true

    } catch (error) {
      throw new UnauthorizedException('token已过期 请重新登录')
    }

  }
}

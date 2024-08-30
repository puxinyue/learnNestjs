import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {Request} from 'express';
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

 async canActivate(
    context: ExecutionContext,
  ){
    const request:Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const bearer = token?.split(' ')?.[1];
    console.log(bearer)
    if(bearer){
      try {
       const jwtData =  await this.jwtService.verifyAsync(bearer);
       console.log(jwtData)
 
        return true;
      } catch (error) {
        throw new UnauthorizedException('登录 token 错误');
        
      }
  }
   throw new UnauthorizedException('登录 token 错误');;
}
}

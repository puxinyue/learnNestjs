import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { EntityManager } from 'typeorm';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
       throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = authorization.split(' ')[1];
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new HttpException('token失效请重新登录', HttpStatus.UNAUTHORIZED);
      
    }

  }
}

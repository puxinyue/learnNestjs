import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private jwtService: JwtService
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization
    if (!authorization) {
      throw new UnauthorizedException('用户未登录')
    }
    const token = authorization.split(' ')[1]
    try {
      this.jwtService.verify(token)
      return true
    } catch (e) {
      throw new UnauthorizedException('权限已过期,请重新登录')
    }
  }
}

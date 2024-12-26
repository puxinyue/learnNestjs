import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isTokenExpiringSoon } from './utils/jwt.util';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('请先登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = await this.jwtService.verify(token);

      // 检查 token 是否即将过期（如果剩余时间小于 15 秒就刷新）
      if (isTokenExpiringSoon(token)) {
        console.log('Token 即将过期，正在刷新...');
        // 生成新的 token
        const newToken = await this.jwtService.sign(
          { username: data.username },
          { expiresIn: '7d' }
        );

        // 设置响应头
        response.setHeader('token', newToken);
        console.log('已生成新的 token');
      } else {
        console.log('Token 状态正常，无需刷新');
      }

      return true;
    } catch (e) {
      console.error('Token 验证失败:', e);
      throw new UnauthorizedException('token已失效，请重新登录');
    }
  }
}

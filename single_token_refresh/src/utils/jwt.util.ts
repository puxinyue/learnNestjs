import { JwtService } from '@nestjs/jwt';

export function isTokenExpiringSoon(token: string, minutesThreshold: number = 5): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const expirationTime = decoded.exp * 1000; // 转换为毫秒
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;

    console.log('Token 信息：', {
      过期时间: new Date(expirationTime).toLocaleString(),
      当前时间: new Date(currentTime).toLocaleString(),
      剩余毫秒: timeUntilExpiry,
      阈值毫秒: minutesThreshold * 60 * 1000,
      是否即将过期: timeUntilExpiry < minutesThreshold * 60 * 1000
    });

    return timeUntilExpiry < minutesThreshold * 60 * 1000;
  } catch (error) {
    console.error('Token 解析错误:', error);
    return false;
  }
} 
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from '../redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private readonly redisService: RedisService

  @Get('code')
  async sendCode(@Query('email') email: string) {
    // 生成6位随机验证码
    const code = Math.random().toString(36).substring(2, 8);
    await this.redisService.set(email, code, 60 * 5);
    await this.emailService.sendEmail(email, code);
    return {
      code,
    };
  }


}

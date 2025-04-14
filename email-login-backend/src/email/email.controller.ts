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
    const code = Math.random().toString(36).substring(2, 15);
    await this.redisService.set(email, code, 60 * 5);
    await this.emailService.sendEmail(email, code);
    return {
      code,
    };
  }


}

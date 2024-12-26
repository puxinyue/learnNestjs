import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return 'Redirecting to google...'
  }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}

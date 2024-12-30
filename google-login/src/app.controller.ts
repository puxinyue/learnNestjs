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
  async googleLoginCallback(@Request() req) {

    const user = await this.appService.getUserByEmail(req.user.email);

    if (!user) {
      const newuser = await this.appService.registerByGoogleInfo(req.user);
      return newuser;
    } else {
      return user;
    }

  }
}

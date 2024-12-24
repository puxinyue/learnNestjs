import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { IsPublic } from './is-public.decorator';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

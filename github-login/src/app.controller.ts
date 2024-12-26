import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('login')
  @UseGuards(AuthGuard('github'))
  login(@Request() req): string {
    return 'asdas66'
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  callback(@Request() req): string {
    return this.appService.findUserByGithubId(req.user.id)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

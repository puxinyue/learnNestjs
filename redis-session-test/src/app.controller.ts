import { Controller, Get, Inject, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Inject(SessionService) sessionService: SessionService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async getCount(@Request() req: any, @Response() res: any) {
    const sid = req.cookies['sid'];
    const session = await this.sessionService.getSession(sid)

    return session

  }
}

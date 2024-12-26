import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly personService: PersonService) {}

  @Get()
  getHello(): string {
    console.log('hander.....')
    return this.personService.findAll()
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log('aaa')
    return 'aaa'
  }

  @Get('bbb')
  bbb(): string {
    console.log('bbb')
    return 'bbb'
  }
}

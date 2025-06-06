import { Body, Controller, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    const user = await this.userService.login(loginUserDto);
    session.user = {
      id: user.id,
      userName: user.userName,
    }
    return 'success';
  }
}

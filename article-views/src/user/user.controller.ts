import { Body, Controller, Post,Session} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    const { userName, passWord } = loginUserDto;
    const user = await this.userService.login(userName, passWord);
    session.user = {
      id: user.id,
      userName: user.userName,
    }
    return 'success';
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/regester.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('login')
 async login(@Body() body: LoginDto) {
    return await this.userService.login(body.username, body.password);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.userService.register(body.username, body.password);
  }
}

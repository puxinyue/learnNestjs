import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/regester.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
   @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
 async login(@Body(ValidationPipe) body: LoginDto,@Res({passthrough:true}) res:Response ) {
    const userData = await this.userService.login(body.username, body.password);
      if(userData){
      const token = await this.jwtService.signAsync({
          user:{
            id:userData.id,
            username:userData.username,
          }
      })
      res.setHeader('token',token);
      return '登录成功';
    }else{
      return '登录失败';
    }
  
  }

  @Post('register')
  async register(@Body(ValidationPipe) body: RegisterDto) {
    return await this.userService.register(body.username, body.password);
  }
 
  @Get('ccc')
  @UseGuards(LoginGuard)
  ccc() {
    return 'ccc'
  }

}

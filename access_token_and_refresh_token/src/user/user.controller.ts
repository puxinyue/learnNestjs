import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
async Login(@Body() loginUserDto: LoginUserDto) {
 const user =  await this.userService.login(loginUserDto);

  const access_token = this.jwtService.sign({userId:user.id,username:user.username},{expiresIn:'30m'});
  const refresh_token =  this.jwtService.sign({userId:user.id},{expiresIn:'7d'});

    return {
      access_token,
      refresh_token
    }
  }

  @Get()
  @UseGuards(LoginGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken:string){
    try {
       const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId);
      const refresh_token = this.jwtService.sign({userId:user.id},{expiresIn:'7d'});
      const access_token = this.jwtService.sign({userId:user.id,username:user.username},{expiresIn:'30m'});
      
      return {
        refresh_token,
        access_token
      }
      
    } catch (error) {
      throw new HttpException('token失效请重新登录', HttpStatus.UNAUTHORIZED);

    }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

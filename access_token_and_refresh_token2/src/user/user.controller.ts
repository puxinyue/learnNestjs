import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Query, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Inject()
  private jwtService: JwtService
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async Login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto)
    const accessToken = this.jwtService.sign({ userId: user.id, username: user.username }, { expiresIn: '60s' })
    const refreshToken = this.jwtService.sign({ userId: user.id }, { expiresIn: '1d' })

    return {
      accessToken,
      refreshToken
    }
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') Token: string) {
    console.log(Token)
    try {
      const user = this.jwtService.verify(Token)
      const accessToken = this.jwtService.sign({ userId: user.id, username: user.username }, { expiresIn: '60s' })
      const refreshToken = this.jwtService.sign({ userId: user.id }, { expiresIn: '1d' })
      return {
        accessToken,
        refreshToken
      }
    } catch (e) {
      throw new UnauthorizedException('Token无效,请重新登录')

    }
  }
  @Get('aaa')
  findAll() {
    return this.userService.findAll();
  }

  @Get('bbb')
  @UseGuards(LoginGuard)
  findBBB() {
    return 'bbbbccc';
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

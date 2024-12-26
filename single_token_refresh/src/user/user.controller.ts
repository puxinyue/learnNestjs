import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from 'src/login.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @Post('login')
  create(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @Get('bbb')
  @UseGuards(LoginGuard)
  findAll() {
    return {
      code: 0,
      data: 'This action returns all userbbbbb',
      message: '获取数据成功'
    };
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

  @Post('refresh')
  async refresh(@Body() body: { token: string }) {
    try {
      const data = await this.jwtService.verify(body.token);

      // 生成新的 token，有效期设置长一些
      const newToken = await this.jwtService.sign(
        { username: data.username },
        { expiresIn: '7d' }
      );

      return {
        token: newToken
      }
    } catch (e) {
      throw new BadRequestException('token 已失效，请重新登录');
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Inject(JwtService)
  private readonly jwtService;

  @Post('login')
  async create(@Body() loginUserDto:LoginUserDto ) {
   const user =  await this.userService.login(loginUserDto);
    
  const token = await this.jwtService.sign({
      user:{
        id:user.id,
        username:user.username
      }
    })
    
    return token
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('init')
  async getDataInit() {
    await this.userService.getDataInit();
    return 'done'
  }
}

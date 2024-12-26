import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  @Inject()
  private jwtService: JwtService

  login(loginUserDto: LoginUserDto) {
    if (loginUserDto.password !== '123456' || loginUserDto.username !== '张三') {
      throw new BadRequestException('用户名或密码错误')
    }

    const token = this.jwtService.sign(
      { username: loginUserDto.username },
      { expiresIn: '7d' }
    )

    return {
      token
    }
  }
}

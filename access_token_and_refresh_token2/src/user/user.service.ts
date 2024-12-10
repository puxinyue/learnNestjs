import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

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

  async login(loginUserDto: LoginUserDto) {
    const user: any = await this.entityManager.findOne('User', {
      where: {
        username: loginUserDto.username,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }
    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.OK);
    }
    return user;
  }

}

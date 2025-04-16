import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async login(loginUserDto: LoginUserDto) {
    const { userName, passWord } = loginUserDto;
    const user = await this.entityManager.findOne(User, {
      where: {
        userName,
      }
    });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (user.passWord !== passWord) {
      throw new BadRequestException('用户密码错误');
    }
    return user;
  }
}
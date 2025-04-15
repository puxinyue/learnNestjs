import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async login(userName: string, passWord: string) {
    const user = await this.entityManager.findOne(User, {
      where: {
        userName,
        passWord
      }
    });
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    return user;
  }
}
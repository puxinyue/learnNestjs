import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RedisService } from '../redis/redis.service';
import { BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
  export class UserService {

  constructor(private readonly redisService: RedisService) {}

  @InjectEntityManager()
  private readonly entityManager: EntityManager

 async login(loginUserDto: LoginUserDto) {
  //使用的是密码账号登录的情况
  
    const code = await this.redisService.get(loginUserDto.email);
    if(!code){
      throw new BadRequestException('验证码已过期');
    }
    if(code !== loginUserDto.code){
      throw new BadRequestException('验证码错误');
    }
    const user = await this.entityManager.findOne(User, {
      where: {
        email: loginUserDto.email,
      },
    });
    if(!user){
      throw new BadRequestException('用户不存在');
    }
    return 'success';
  }

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
}

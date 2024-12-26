import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  
  @InjectEntityManager()
  private entityManager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;


 private logger = new Logger();

  async login(username: string, password: string) {
   const data = await this.userRepository.findOne({
      where: {
        username,
      }
    });
    if(!data){
      throw new HttpException('用户名错误', 200);
    }else if(data.password === md5(password)){
      return data;
    }else{
      throw new HttpException('密码错误', 200);
    }
  }

  async register(username: string, password: string) {


 const userData = await this.userRepository.findOne({
      where: {
        username,
      }
    });

    if(userData){
      throw new HttpException('用户已存在', 200);
    }
    const newUser = new User();
    newUser.username = username;
    newUser.password = md5(password);
    
     try {
      await this.entityManager.save(User, newUser);
      return '注册成功';
     } catch (error) {
      this.logger.error(error,UserService);
      throw new HttpException('注册失败', 200);
     }
  }

}

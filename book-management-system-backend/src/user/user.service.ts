import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  DbService: DbService;

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
 async register(createUserDto: CreateUserDto){
    const users:User[] =  await this.DbService.red()
    const isHas = users?.find((item)=>item.userName==createUserDto.userName)
    if(isHas){
       throw new BadRequestException('该用户已经存在！');
    }
  
     const user = new User()
     user.passWord = createUserDto.passWord
     user.userName = createUserDto.userName
     users.push(user)
     await this.DbService.while(users)
  
     return user
  }
  async login(LoginUserDto: LoginUserDto){
    const users:User[] =  await this.DbService.red()
    const isHas = users?.find((item)=>item.userName==LoginUserDto.userName)
    if(isHas?.userName!==LoginUserDto?.userName){
      throw new BadRequestException('用户名错误')
  } 
    if(isHas.passWord!==LoginUserDto.passWord){
       throw new BadRequestException('密码错误！')
    }
    return isHas
  }
}

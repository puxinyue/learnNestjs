import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

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

 async initData() {
    const permission1 = new Permission();
    permission1.name = 'create_aaa';
    permission1.desc = '新增 aaa';

    const permission2 = new Permission();
    permission2.name = 'update_aaa';
    permission2.desc = '修改 aaa';

    const permission3 = new Permission();
    permission3.name = 'remove_aaa';
    permission3.desc = '删除 aaa';

    const permission4 = new Permission();
    permission4.name = 'query_aaa';
    permission4.desc = '查询 aaa';

    const permission5 = new Permission();
    permission5.name = 'create_bbb';
    permission5.desc = '新增 bbb';

    const permission6 = new Permission();
    permission6.name = 'update_bbb';
    permission6.desc = '修改 bbb';

    const permission7 = new Permission();
    permission7.name = 'remove_bbb';
    permission7.desc = '删除 bbb';

    const permission8 = new Permission();
    permission8.name = 'query_bbb';
    permission8.desc = '查询 bbb';

    const user1 = new User();
    user1.username = '东东';
    user1.password = 'aaaaaa';
    user1.permissions  = [
      permission1, permission2, permission3, permission4
    ]

    const user2 = new User();
    user2.username = '光光';
    user2.password = 'bbbbbb';
    user2.permissions  = [
      permission5, permission6, permission7, permission8
    ]

    await this.entityManager.save(Permission,[
      permission1, 
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8
    ])
    await this.entityManager.save(User,[
      user1, 
      user2
    ]);
}
 
async login(body: LoginUserDto,) {
  const data = await this.entityManager.findOne(User, {
     where:{
      username: body.username
     }
  })
  if(!data) {
    throw new HttpException('用户不存在', HttpStatus.ACCEPTED)
  }

  if(data.password !== body.password) {
    throw new HttpException('密码错误', HttpStatus.ACCEPTED)
  }
  return body;
   
 }

 async findByUsername(username: string) {
  return await this.entityManager.findOne(User, {
    where: {
      username
    },
    relations: ['permissions']

  })
 }
}

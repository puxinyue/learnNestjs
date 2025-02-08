import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import UserVo from './vo/user.vo';

let id = 0;
const dataBase = []
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    user.id = id++;
    dataBase.push(user);
    return user
  }

  findAll() {
    // dataBase.map(user => new UserVo({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    // }));
    return dataBase
  }

  findOne(id: number) {
    const obj = dataBase.find(user => user.id === id)
    // new UserVo({
    //   id: obj.id,
    //   name: obj.name,
    //   email: obj.email
    // })
    return obj
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

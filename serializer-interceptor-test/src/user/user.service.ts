import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const database = [
  new User({ id: 1, name: 'xxx', password: 'xxx', email: 'xxx@xx.com' }),
  new User({ id: 2, name: 'yyy', password: 'yyy', email: 'yyy@yy.com' })
]
let id = 0;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User({ ...createUserDto, id: ++id });
    database.push(user);
    return user;
  }

  findAll() {
    return database;
  }

  findOne(id: number) {
    return database.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

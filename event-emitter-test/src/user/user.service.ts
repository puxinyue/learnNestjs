import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class UserService {

  constructor(private readonly eventEmitter: EventEmitter2) {}
  
 
  create(createUserDto: CreateUserDto) {
    this.eventEmitter.emit('user.register', {
      email: createUserDto.email,
      username: createUserDto.username,
    });
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @InjectRepository(User)
  private readonly userRepository:Repository<User>;

  create(createUserDto: CreateUserDto) {
    return this.entityManager.save(User,createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.entityManager.findOne(User,{where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.entityManager.save(User,{id,...updateUserDto});
  }

  remove(id: number) {
    return this.entityManager.delete(User,{id});
  }
}

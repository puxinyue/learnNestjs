import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return `This action adds a new person name:${createPersonDto.name} age:${createPersonDto.age}`;
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
  createFile(createPersonDto: CreatePersonDto){
    return `data:${JSON.stringify(createPersonDto)}`;
  }
}

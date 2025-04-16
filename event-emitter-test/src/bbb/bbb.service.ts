import { Injectable } from '@nestjs/common';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BbbService {
  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  @OnEvent('aaa.findAll')
  findAll(data: string) {
    console.log(data);
    return `This action returns all bbb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb`;
  }
}

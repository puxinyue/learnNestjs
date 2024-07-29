import { Injectable } from '@nestjs/common';
import { CreateGggDto } from './dto/create-ggg.dto';
import { UpdateGggDto } from './dto/update-ggg.dto';

@Injectable()
export class GggService {
  create(createGggDto: CreateGggDto) {
    return 'This action adds a new ggg';
  }

  findAll() {
    return `This action returns all ggg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ggg`;
  }

  update(id: number, updateGggDto: UpdateGggDto) {
    return `This action updates a #${id} ggg`;
  }

  remove(id: number) {
    return `This action removes a #${id} ggg`;
  }
}

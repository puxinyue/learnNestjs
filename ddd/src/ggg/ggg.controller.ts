import { Controller, Get, Post, Body, Patch, Param, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { GggService } from './ggg.service';
import { CreateGggDto } from './dto/create-ggg.dto';
import { UpdateGggDto } from './dto/update-ggg.dto';

@Controller({path:'ggg',version:VERSION_NEUTRAL})
export class GggController {
  constructor(private readonly gggService: GggService) {}

  @Post()
  create(@Body() createGggDto: CreateGggDto) {
    return this.gggService.create(createGggDto);
  }

  @Version('2')
  @Get()
  findAll2() {
    return this.gggService.findAll()+'version2';
  }

  @Get()
  findAll() {
    return this.gggService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gggService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGggDto: UpdateGggDto) {
    return this.gggService.update(+id, updateGggDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gggService.remove(+id);
  }
}

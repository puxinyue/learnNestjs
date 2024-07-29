import { Module } from '@nestjs/common';
import { GggService } from './ggg.service';
import { GggController } from './ggg.controller';

@Module({
  controllers: [GggController],
  providers: [GggService],
})
export class GggModule {}

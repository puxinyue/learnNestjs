import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { GggModule } from './ggg/ggg.module';

@Module({
  imports: [XxxModule, PersonModule, GggModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

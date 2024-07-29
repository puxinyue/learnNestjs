import { Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService]
})
export class PersonModule implements OnModuleInit {
  onModuleInit() {
    console.log('onModuleInit66666')
  }
}

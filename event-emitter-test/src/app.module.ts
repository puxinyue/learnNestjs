import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [EventEmitterModule.forRoot({
    wildcard: true,
    delimiter: '.',
  }), AaaModule,
   BbbModule, 
   UserModule, 
   NotificationModule, 
   EmailModule, 
   ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'src/.env',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

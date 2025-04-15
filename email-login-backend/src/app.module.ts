import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'email_login',
    entities: [User],
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password',
    },
    logging: true,
    synchronize: true,
  }), EmailModule, RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

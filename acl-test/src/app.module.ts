import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { User } from './user/entities/user.entity';
import { Permission } from './permission/entities/permission.entity';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'alc_test',
    entities: [User,Permission],
    synchronize: true,
    logging: true,
    connectorPackage:'mysql2',
    extra:{
      authPlugin: 'sha256_password'
    }
  }), UserModule, PermissionModule, AaaModule, BbbModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

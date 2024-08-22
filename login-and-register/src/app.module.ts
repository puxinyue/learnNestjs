import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'login_test',
    entities: [User],
    logging: true,
    synchronize: true,
    connectorPackage:'mysql2',
    extra:{
      authPlugin: 'sha256_password'
    }
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'google_login',
    entities: [User], // __dirname + '/**/*.entity{.ts,.js}'
    synchronize: true,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    logging: true,
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password'
    }

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

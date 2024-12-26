import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'xinyu',
      database: 'refresh_token_test2',
      entities: [User],
      logging: true,
      synchronize: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: "sha256_password"
      }
    }),
    JwtModule.register({
      secret: 'xinyu',
      signOptions: { expiresIn: '60s' },
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

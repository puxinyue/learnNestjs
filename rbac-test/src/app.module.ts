import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { JwtModule } from '@nestjs/jwt';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'rbac_test',
    entities: [User,Role,Permission],
    synchronize: true,
    logging: true,
    connectorPackage:'mysql2',
    extra:{
      authPlugin:'sha256_password'
    }
  }),JwtModule.register({
    global:true,
    secret:'xinyuee',
    signOptions:{expiresIn:'1h'}
  }), RoleModule, PermissionModule, AaaModule, BbbModule],
  controllers: [AppController],
  providers: [
    AppService,
    {provide:'APP_GUARD',useClass:LoginGuard},
    {provide:'APP_GUARD',useClass:PermissionGuard}
  ],
})
export class AppModule {}

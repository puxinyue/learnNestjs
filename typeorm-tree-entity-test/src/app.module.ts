import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city/entities/city.entity';

@Module({
  imports: [CityModule,TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'typeorm_test',
    username: 'root',
    password:'xinyu',
    host: 'localhost',
    port: 3306,
    logging: true,
    entities: [City],
    synchronize: true,
    connectorPackage:'mysql2',
    extra:{
      authPlugin:"sha256_password"
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

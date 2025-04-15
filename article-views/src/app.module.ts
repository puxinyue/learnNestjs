import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',  
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'xinyu',
    database: 'article_views',
    entities: [User, Article],
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password',
    },
    logging: true,
    synchronize: true,
  }), UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

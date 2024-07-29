import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import { LoginGuard } from './login.guard';
import { VersioningType } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use((req,res,next)=>{
    console.log('before',req.url)
    next()
    console.log('after...')
  })
  app.useStaticAssets('public',{prefix:'/static'})
  //app.useGlobalGuards(new LoginGuard()) // 全局的权限控制
  app.enableVersioning({ // 版本控制
    type:VersioningType.HEADER,
    header: 'version'
  })
  await app.listen(3000);
}
bootstrap();

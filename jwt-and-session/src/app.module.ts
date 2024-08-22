import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => ({
      secret: 'xinyu',
      signOptions: { expiresIn: '7d' },
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

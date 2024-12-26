import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }

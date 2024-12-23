import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule { }

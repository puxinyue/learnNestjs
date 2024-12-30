import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entity/User';

@Injectable()
export class AppService {

  @InjectEntityManager()
  private readonly entityManager;


  async registerByGoogleInfo(googleInfo: any) {
    const user = new User();

    user.nickName = `${googleInfo.firstName}_${googleInfo.lastName}`;
    user.avater = googleInfo.picture;
    user.email = googleInfo.email;
    user.password = '';
    user.registerType = 2;

    return this.entityManager.save(User, user);
  }


  async getUserByEmail(email: string) {
    if (!email) {
      throw new Error('Email must be provided');
    }
    return this.entityManager.findOneBy(User, {
      registerType: 2,
      email
    });
  }


  getHello(): string {
    return 'Hello World!';
  }
}

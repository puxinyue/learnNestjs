import { Strategy, Profile } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
const env = require('dotenv').config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/callback',
      scope: ['public_profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user: any) => void,
  ): Promise<any> {
    return profile
  }
}



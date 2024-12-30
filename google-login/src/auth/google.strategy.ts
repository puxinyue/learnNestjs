import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { SocksProxyAgent } from 'socks-proxy-agent'
require('dotenv').config();

const agent = new SocksProxyAgent('socks://127.0.0.1:7890');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    console.log(process.env.GOOGLE_CLIENT_ID)
    console.log(process.env.GOOGLE_CLIENT_SECRET)
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/callback/google',
      agent: agent,
      scope: ['email', 'profile'],
    });
    this._oauth2.setAgent(agent)
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: (error: any, user: any) => void) {
    console.log(profile);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }
    return user;
  }
}

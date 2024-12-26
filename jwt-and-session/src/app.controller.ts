import { Controller, Get, Header, Headers, Inject, Res, Session, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Inject(JwtService)
  private jwtService: JwtService

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>) {
    session.count = session.count ? session.count + 1 : 1
    return session.count
  }

  @Get('jwt')
  getJwt(@Res({passthrough:true}) res: Response) {
    //passthrough:true 才会返回body
    console.log(res)
    const newToken = this.jwtService.sign({ 
      count: 1,
    })
    res.header('token', newToken)
    
    return newToken
  }

  @Get('ttt')
  getTtt(@Headers('authorization') authorization: string, @Res({passthrough:true}) res: Response) {
    //passthrough:true 才会返回body
     if(authorization){
       try {
        const token = authorization.split(' ')[1]
        const payload = this.jwtService.verify(token)

        const newToken = this.jwtService.sign({ 
         count: payload.count + 1,
        })
        res.header('token', newToken)

        return payload.count+1
        
     } catch (error) {
        throw new UnauthorizedException()
     }
     }else{
        const newToken = this.jwtService.sign({ 
         count: 1,
        })
        res.header('token', newToken)

        return 1
     }
    
  }
}

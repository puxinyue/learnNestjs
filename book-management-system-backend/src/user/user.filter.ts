import { ArgumentsHost, Catch, ExceptionFilter,HttpException } from '@nestjs/common';
import { Response } from 'express'

@Catch(HttpException)
export class UserFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
     const response = host.switchToHttp().getResponse<Response>()
     const statusCode = exception.getStatus()
     const msgs = exception.getResponse() as  { message: string[] }
     const msg = msgs.message?.join? msgs.message?.join(',') : msgs.message
     response.status(statusCode).json({
       code:statusCode,
       message:msg,
       error:'Bad requset'
     })
  }
}

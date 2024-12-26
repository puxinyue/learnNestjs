import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AaaFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
   
  }
}

import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

export const MyQuery = createParamDecorator((key:string,ctx:ExecutionContext)=>{
   const request = ctx.switchToHttp().getRequest()
   return request.query[key]
})
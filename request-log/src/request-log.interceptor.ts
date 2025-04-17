import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
import * as requestIp from 'request-ip';
import { HttpService } from '@nestjs/axios';
import * as iconv from 'iconv-lite';
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLogInterceptor.name);

  @Inject(HttpService)
  private readonly httpService: HttpService;

  async ipToCity(ip: string) {
    //https://whois.pconline.com.cn/
    const response = await this.httpService.axiosRef(`https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`, {
      responseType: 'arraybuffer',
      transformResponse: [
        (data) => {
          const str = iconv.decode(data, 'gbk');
          return JSON.parse(str);
        }
      ]
    });
    return response.data.addr;
  }


  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const userAgent = request.headers['user-agent'];
    const { method, ip, path } = request;

    const clientIp = requestIp.getClientIp(request) || ip;

    const { statusCode } = response;
    this.logger.debug(`${method} ${path} ${clientIp} ${userAgent}:
      ${context.getClass().name} ${context.getHandler().name}`);

    //https://whois.pconline.com.cn/ 查看的IP地址
    console.log(await this.ipToCity('221.237.121.165'))

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const responseTime = Date.now() - now;
        this.logger.debug(`${method} ${path} ${clientIp} ${userAgent}:
          ${statusCode} ${responseTime}ms`);
        this.logger.debug(`response: ${JSON.stringify(res)}`);
      }),
    );
  }
}

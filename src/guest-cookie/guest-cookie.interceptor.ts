import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class GuestCookieInterceptor implements NestInterceptor {

  private readonly logger = new Logger("GuestCookieInterceptor");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const visitorId = request.cookies?.['visitor-id'];    

    if (!visitorId) {

      this.logger.log(`${Date.now()} : 쿠키 발급 ....`);


      response.cookie('visitor-id', 'guest', {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1, // 7일
      });
    } else {
      this.logger.log(`${Date.now()} : 쿠키 발급 안함....`);
    }

    return next.handle();

  }
}

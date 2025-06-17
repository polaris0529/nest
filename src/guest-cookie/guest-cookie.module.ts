import { Module } from '@nestjs/common';
import { GuestCookieInterceptor } from './guest-cookie.interceptor';

@Module({
    providers: [GuestCookieInterceptor] ,  
    exports: [GuestCookieInterceptor]
})
export class GuestCookieModule {}

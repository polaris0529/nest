import { CanActivate, ExecutionContext, HttpException, HttpExceptionOptions, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
const _ = require('lodash');


@Injectable()
export class RoleGuard implements CanActivate, OnModuleInit {

  private readonly logger = new Logger('RoleGuard');
  private _whiteList: string[] = [];

  constructor(
    private readonly roleService: RoleService  ) {
    /* 차단 IP 조회 하는 서비스 모델 구현 */
    /* 동일 가드에 대한 싱글톤 패턴 구현 DI 에 구현된 형성 떄만 할당 후 갱신 처리핤 있도록 서비스 추가 필요로함
     */
  }

  async onModuleInit() {

    let ipList = _.map(await this.roleService.selectIpList(), (item) => item.ip_address);
    this.logger.log(ipList);
    this._whiteList = ipList;     /* 처음 초기화 */
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    try {

      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const reuqestIp = req.headers['x-forwarded-for'];
      
      this.logger.log(`가드 작동 테스트 : ${reuqestIp}`);
      /* api 처리를 위한 key 추가 */

      if (this._whiteList.includes(reuqestIp)) {
        return true;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

    } catch (error) {
      return false
    }

    /** 밴 처리 되 었을 경우 next() 처리해줄 미들웨어나 예외 처리가 있어야함  */
  }
}

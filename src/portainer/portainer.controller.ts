import { Controller, Res, All, UseInterceptors, Scope, Inject, Render } from '@nestjs/common';
import { Request, Response } from 'express'
import { PortainerService } from './portainer.service';
import { PortainerInterceptor } from './portainer.interceptor';

@UseInterceptors(PortainerInterceptor)
@Controller({ path: 'portainer', scope: Scope.REQUEST })
export class PortainerController {
  constructor(private readonly portainerService: PortainerService) { }

  @All("/getEndpoint")
  async getEndpoint(@Res() res: Response) {
    const result: Promise<any> = await this.portainerService.getEndpoint();
    return res.send({ result: result }).status(200);
  }

  @All("/getContainer")
  async getContainer(@Res() res: Response) {
    const result: Promise<any> = await this.portainerService.getContainer();
    return res.send({ result: result }).status(200);
  }

  @All("/getDashBoard")
  @Render("index")
  async getDashBoard(@Res() res: Response) {      
  }







}

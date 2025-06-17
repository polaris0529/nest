import { Controller, Res, All, UseInterceptors, Scope, Post, Req, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import { PortainerService } from './portainer.service';
import { PortainerInterceptor } from './portainer.interceptor';
import { FileReadUtils } from 'src/utils/FileReadUtils';
import { RoleGuard } from 'src/role/role.guard';


@UseInterceptors(PortainerInterceptor)
@Controller({ path: 'portainer', scope: Scope.REQUEST })
export class PortainerController {

  constructor(
    private readonly portainerService: PortainerService ,
    private readonly fileReadUtils: FileReadUtils
  ) {    
  }

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
  
  @All("/error")
  async error(@Res() res: Response) {
    
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    //return res.send({ result: result }).status(200);
  }


  /** 가드 추가 */
  @UseGuards(RoleGuard)
  @Post("/startContainer")
  async startContainer(@Body('CONTAINER_ID') CONTAINER_ID: string ,  @Res() res: Response) {
    
    console.log(CONTAINER_ID);
    
    const result: Promise<any> = await this.portainerService.startContainer(CONTAINER_ID);
    ///const result = {};
    return res.send({ result: result }).status(200);
    //return res.send().status(200);
  }  

  @UseGuards(RoleGuard)
  @Post("/stopContainer")
  async stopContainer(@Body('CONTAINER_ID') CONTAINER_ID: string, @Res() res: Response) {

    const result: Promise<any> = await this.portainerService.stopContainer(CONTAINER_ID);
    //const result = {};
    return res.send({ result: result }).status(200);
  }  

  
  @All("/getDashBoard")
  async getDashBoard(@Res() res: Response) {      
    
    const jsFiles = await this.fileReadUtils.getJsFiles("portainer");
    const cssFiles = await this.fileReadUtils.getCssFiles("portainer");

    return res.render("common/contents", {
      title: 'portainer', 
      jsFiles: jsFiles,      
      cssFiles: cssFiles
    })    
  }







}

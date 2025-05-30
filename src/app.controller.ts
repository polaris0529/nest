import { Controller, Get, Render, Req, Res, All } from '@nestjs/common';
import { Request , Response } from 'express'
import { AppService } from './app.service';


@Controller()
export class AppController {

  constructor(private appservice:AppService) { }
  
  @Get('/index')  
  root(@Res() res: Response) {    
    return res.redirect("https://wiki.polaris0529.store");
  }

  @Get('/aa')
  @Render('index')
  async getHello(@Res() res: Response) {          
    return { message: 'Hello from Fastify + NestJS!' };
  }

  @All("/hello")  
  async getData(@Req() req: Request,@Res() res: Response) {
    const result: string = this.appservice.getHello();
    return res.send({ result: result }).status(200);

  }

  @All("/getEndpoint")
  async getEndpoint(@Req() req: Request, @Res() res: Response) {

    const result: Promise<any> = await this.appservice.getEndpoint();
    return res.send({ result: result }).status(200);

  }

  @All("/getContainer")
  async getContainer(@Req() req: Request, @Res() res: Response) {

    const result: Promise<any> = await this.appservice.getContainer();
    return res.send({ result: result }).status(200);

  }

}
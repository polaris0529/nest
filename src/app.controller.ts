import { Controller, Get, Req, Res, All } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';


@Controller()
export class AppController {

  constructor(private appservice:AppService) { }
  
  @Get()
  root(@Res() res: Response) {
    res.render('index', { message: 'Hello world!' })
  }

}
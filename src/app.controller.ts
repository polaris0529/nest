import { Controller, Get, Render, Res, All } from '@nestjs/common';
import { Response } from 'express'
import { join } from 'path'
import { DataSource } from 'typeorm'
// import TitlesService from './title/title.service';


@Controller()
export class AppController {  

  constructor(
    // private titleService: TitlesService
    
  ) { }

  @Get('/aa')
  getHello(@Res() res: Response) {
    console.log(join(__dirname, '..', 'build', 'index.html'));
    return res.sendFile(join(__dirname, '..', 'build', 'index.html'))
  }

  @All("/getData")
  async getData(@Res() res: Response) {

    await res.json({ msg: "hello" }).sendStatus(200); 
    return res;
  }

  @All("/getTable")
  async getTable(@Res() res: Response) {

    //const result = await this.dataSource.query('SELECT * fROM employees limit 50;')
    // const result = await this.titleService.findAll();
    console.log('aaa')
    await res.json('aaa').sendStatus(200);


    return res;
  }
    


}

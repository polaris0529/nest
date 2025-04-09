import { Controller, Get, Render, Res, All } from '@nestjs/common';
import { Response } from 'express'
import { join } from 'path'
import { DataSource } from 'typeorm'


@Controller()
export class AppController {  

  constructor(private dataSource: DataSource) { }

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

    const result = await this.dataSource.query('SELECT * fROM resortavailability')
    console.log(result)
    return res.json(result).sendStatus(200);
  }
    


}

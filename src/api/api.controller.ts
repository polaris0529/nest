import { Controller, Get, Post, Body, Patch, Param, Delete, Res, All, Render, Req, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/view')
  @Render('list')    
  async getView() {    
  }


  @Get('/get')
  async getFind(
    @Query('alias') alias: string,
    @Query('domain') domain: string
  ): Promise<any> {    
    

    return await this.apiService.findAll({ alias, domain });
  }


  @Post('/gettt')
  async postFind(
    @Body() createApiDto: CreateApiDto,
    @Res() res: Response): Promise<any> {    
    
    //const result: any = this.apiService.findAll();
    return res.json();
  }

  // @All("*")    
  // @Render('index')
  // async default() { }

}

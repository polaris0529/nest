import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {  

  @Get("/ttt")
  getHello(): string {
    return "sss";
  }
}

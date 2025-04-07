import { Controller } from '@nestjs/common';
import { FsService } from './fs.service';



@Controller('fs')
export class FsController {

    constructor(fsService:FsService) {}

}

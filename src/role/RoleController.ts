import { All, Body, Controller, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { RoleGuard } from './role.guard';
import { FileReadUtils } from 'src/utils/FileReadUtils';
import { RoleService } from './role.service';
import { Context } from 'vm';


@UseGuards(RoleGuard)
@Controller('admin/role')
export class RoleController {

    private readonly logger = new Logger('RoleController');

    constructor(
        private readonly roleService: RoleService,
        private readonly fileReadUtils: FileReadUtils
    ) {

    }

    @All('get')
    async get(@Req() req: Request, @Res() res: Response) {

        const result = await this.roleService.selectIpList();
        
        res.json({ result: result }).status(200);
    }

    @Post('insert')
    async insert(
        @Req() req: Request,
        @Body() body:Body,
        @Res() res: Response) {
        const result = await this.roleService.insertIp(body);
        
        this.logger.log(result);
        res.json({ result: result }).status(200);
    }

    @Post('update')
    async update(
        @Req() req: Request,
        @Body() body:Body,
        @Res() res: Response) {
        
        const result = await this.roleService.selectIpUpDate(body);
        this.logger.log(body);
        res.json({ result: result }).status(200);
    }


    @All("/getDashBoard")
    async getDashBoard(@Req() req:Request ,  @Res() res: Response) {
        
        this.logger.log(req);
        

        const jsFiles = await this.fileReadUtils.getJsFiles("admin/role");
        const cssFiles = await this.fileReadUtils.getCssFiles("admin/role");


        return res.render("admin/role/contents", {
            title: 'role',
            jsFiles: jsFiles,
            cssFiles : cssFiles
        });
    }


}

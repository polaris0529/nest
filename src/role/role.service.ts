import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';


@Injectable()
export class RoleService {

    private readonly logger = new Logger('RoleService');

    constructor(private readonly prismaService: PrismaService) {
    }


    bigintReplacer(key: string, value: any) {

        console.log(key);
        console.log(`${typeof value} : ${value}`);

        return typeof value === 'bigint' ? value.toString() : value;
    }

    async selectIpList(): Promise<any> {

        let result = await this.prismaService.ip_whitelist.findMany({
            select: {
                id : true,
                ip_address : true ,
                description : true ,
                is_active : true ,
                created_at : true ,
                updated_at : true ,
                created_by : true ,
                updated_by : true ,
            },
            where: {
             //   is_active: true
            }
        });

        return JSON.parse(JSON.stringify(result, this.bigintReplacer));
    }

    async insertIp(body): Promise<any> {

        let result = await this.prismaService.ip_whitelist.create({
            data: {                
                ip_address: body.ip_address,
                description: body.description ? body.description : "", 
                created_by: body.created_by ? body.created_by : "admin",
                updated_by: body.updated_by ? body.updated_by : "admin",
            }
        });

        this.logger.log(result);

        return JSON.parse(JSON.stringify(result, this.bigintReplacer));
    }


    async selectIpUpDate(body) {

        let result = await this.prismaService.ip_whitelist.update({
            where: {
                id: body.id
            },
            data: {
                is_active : body.is_active
            }
        })

        return JSON.parse(JSON.stringify(result, this.bigintReplacer));
        
    }    

}

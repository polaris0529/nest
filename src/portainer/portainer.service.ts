import { Controller, Inject, Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { REQUEST } from '@nestjs/core';
import { promises } from 'dns';


@Injectable({ scope: Scope.REQUEST })
export class PortainerService {

    constructor(
        @Inject(REQUEST) private request: Request,
        private configService: ConfigService
    ) { }



    async getEndpoint(): Promise<any> {

        const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN");
        const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN");

        try
        {
            const res: AxiosResponse<any, any> = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints`, { headers: { 'X-API-Key': PORTAINER_TOKEN } });
            return res.data;

        } catch (error)
        {
            console.log(error);
            throw new InternalServerErrorException(error);
        }

    }

    async getContainer(): Promise<any> {

        const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN") ?? '';
        const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN") ?? '';
        
        const result: any = await this.getEndpoint();
        
        console.log(result);


        //const response = await axios.get(`https://admin.polaris0529.store/api/endpoints`,{
        const res: AxiosResponse<any, any> = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints/3/docker/containers/json`, {
            headers: {
                'X-API-Key': PORTAINER_TOKEN
            }
        });

        return res.data;


    }
}

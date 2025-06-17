import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { Console } from 'console';



@Injectable() // injectable needable ? 
export class PortainerService implements OnModuleInit {

    private endpoints: number = 0;
    private readonly logger = new Logger('PortainerService');

    constructor(private configService: ConfigService) {
    }

    async onModuleInit() { }

    setEndpoints(n: number) {
        this.endpoints = n;
    }

    getEndpoints(): number {
        return this.endpoints;
    }

    async getEndpoint(): Promise<any> {

        try {

            const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN");
            const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN");
            const res: AxiosResponse<any, any> = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints`, { headers: { 'X-API-Key': PORTAINER_TOKEN } });
            return res.data;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getContainer(): Promise<any> {

        const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN");
        const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN");

        const res: AxiosResponse<any, any> = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints/${this.endpoints}/docker/containers/json?all==true`, {
            headers: {
                'X-API-Key': PORTAINER_TOKEN
            }
        });

        return res.data;
    }

    async startContainer(CONTAINER_ID: string): Promise<any> {

        const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN");
        const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN");
        const REQUEST_URL: string = `https://${PORTAINER_DOMAIN}/api/endpoints/${this.endpoints}/docker/containers/${CONTAINER_ID}/start`


        this.logger.log(REQUEST_URL);

        const res: AxiosResponse<any, any> = await axios.post(REQUEST_URL, null, {
            headers: {
                'X-API-Key': PORTAINER_TOKEN
            }
        });

        return res.data;
    }

    async stopContainer(CONTAINER_ID: string): Promise<any> {

        const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN");
        const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN");
        const REQUEST_URL: string = `https://${PORTAINER_DOMAIN}/api/endpoints/${this.endpoints}/docker/containers/${CONTAINER_ID}/stop`


        const res: AxiosResponse<any, any> = await axios.post(REQUEST_URL, null, {
            headers: {
                'X-API-Key': PORTAINER_TOKEN
            }
        });

        return res.data;    }


}

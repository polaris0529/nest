import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import axios, { isCancel, AxiosError } from 'axios';
import { promises } from 'dns';


@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
  ) { }

  getHello(): string {
    const result: string = this.configService.getOrThrow("DOMIN_NAME") ?? '';
    console.log(result);
    return  result;
  }

  async getEndpoint(): Promise<any> { 

    const PORTAINER_IP: string = this.configService.getOrThrow("PORTAINER_IP") ?? '';
    const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN") ?? '';
    const PORTAINER_PORT: string = this.configService.getOrThrow("PORTAINER_PORT") ?? '';
    const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN") ?? '';

    //const response = await axios.get(`https://admin.polaris0529.store/api/endpoints`,{
    const response = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints`, {
      headers: {
        'X-API-Key': PORTAINER_TOKEN
      }
    }
    );

    const data: any = response.data;
    console.log(data);
    return data;



    //미들웨어 id 체크 추가해서 변수 설정후 API 처리 하도록 수정 
    
  }

  async getContainer(): Promise<any> { 

    const PORTAINER_IP: string = this.configService.getOrThrow("PORTAINER_IP") ?? '';
    const PORTAINER_TOKEN: string = this.configService.getOrThrow("PORTAINER_TOKEN") ?? '';
    const PORTAINER_PORT: string = this.configService.getOrThrow("PORTAINER_PORT") ?? '';
    const PORTAINER_DOMAIN: string = this.configService.getOrThrow("PORTAINER_DOMAIN") ?? '';

    //const response = await axios.get(`https://admin.polaris0529.store/api/endpoints`,{
    const response = await axios.get(`https://${PORTAINER_DOMAIN}/api/endpoints/3/docker/containers/json`, {
      headers: {
        'X-API-Key': PORTAINER_TOKEN
      }
    }
    );

    const data: any = response.data.map(function (data) {

      const { Id, Names } = data;      
      return { Id, Names };
    
    });



    //console.log(data);
    return data;



    //미들웨어 id 체크 추가해서 변수 설정후 API 처리 하도록 수정 
    

  }




}

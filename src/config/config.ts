import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class Config { 

    constructor(private readonly configService: ConfigService) {        
    }

    get(key: string): any {
        return this.configService.get<string>(key);
    }

    
}

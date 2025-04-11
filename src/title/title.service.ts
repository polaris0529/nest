// src/titles/titles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Titles } from '../../output/entities/Titles';
import { Repository } from 'typeorm';

@Injectable()
export class TitlesService {
    
    constructor(
        @InjectRepository(Titles)
        private titlesRepository: Repository<Titles>,
    ) { }


    async findAll(): Promise<Titles[]> {
         return await this.titlesRepository.find();
    }


}


export default TitlesService;
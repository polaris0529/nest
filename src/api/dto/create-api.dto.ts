import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiDto {

    @IsNotEmpty()
    @IsString()
    url: string

    @IsNotEmpty()
    @IsString()
    accessKey: string

}

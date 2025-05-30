import { IsNotEmpty } from "class-validator";

export class CreateUserDto
{   
    @IsNotEmpty()
    username: string; 

    @IsNotEmpty()
    eamil: string;
    
    @IsNotEmpty()
    password: string;
}
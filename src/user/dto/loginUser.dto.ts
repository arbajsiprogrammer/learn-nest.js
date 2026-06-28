import { IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../constants/user.constants";


export class LoginUserDto {

    @IsEmail()
    email?:string;

    @IsString()
    password?:string;
    
}
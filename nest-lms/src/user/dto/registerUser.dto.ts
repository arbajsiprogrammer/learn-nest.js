import { IsBoolean, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";
import mongoose from "mongoose";
import { ROLE } from "src/common/enums/roles.enum";




export class RegisterUserDto {
    
    @IsString()
    @IsNotEmpty()
    fname!: string;

    @IsString()
    @IsNotEmpty()
    lname!: string;
    
    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    phone!: string;

    @IsEnum(ROLE)
    role!: ROLE;
    
    @IsOptional()
    @IsMongoId()    
    course!: mongoose.Types.ObjectId | null;

    @IsBoolean()
    enrolled!: boolean;


}   
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";
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
    
    @IsString() 
    course!: string | null;

    @IsBoolean()
    enrolled!: boolean;


}   
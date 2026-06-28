import { IsBoolean, IsEmail, IsEnum, IsString} from "class-validator";

enum ROLE {
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin"
}

export class CreateUserDto {
    
    @IsString()
    fname!: string;

    @IsString()
    lname!: string;
    
    @IsString()
    password!: string;

    @IsEmail()
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
import { IsBoolean, IsEmail, IsEnum, IsString} from "class-validator";

enum ROLE {
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin"
}

export class CreateUserDto {
    @IsString()
    id!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsEnum(ROLE)
    role!: ROLE;
    
    @IsString() 
    course!: string | null;

    @IsBoolean()
    enrolled!: boolean;
}
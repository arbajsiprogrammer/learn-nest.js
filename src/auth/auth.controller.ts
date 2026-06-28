import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResponse } from 'src/util/ApiResponse.util';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    @Post("/register")
    @HttpCode(201)
    async createUser(@Body() createUserDto : CreateUserDto):Promise<ApiResponse>{

        const createdUser = await this.AuthService.register(createUserDto);
        console.log("response : ",createdUser);
        
        return new ApiResponse(201, "user created", createdUser);
    }
}

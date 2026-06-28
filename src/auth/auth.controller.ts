import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { ApiResponse } from 'src/util/ApiResponse.util';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    // Register Flow
    @Post("/register")
    @HttpCode(201)
    async createUser(@Body() registerUserDto : RegisterUserDto):Promise<ApiResponse>{

        const token = await this.AuthService.register(registerUserDto);
        console.log("response : ",token);
        
        return new ApiResponse(201, "user created", {access_token : token});
    }

    // logIn Flow
    @Post("/login")
    @HttpCode(200)
    async logIn(@Body()loginUserDto:LoginUserDto):Promise<ApiResponse>{
        
        console.log("loginUserDto inside LogIn ",loginUserDto);
        const token = await this.AuthService.logIn(loginUserDto);

        return new ApiResponse(201, "LogIn successful", {access_token : token});
    }
}

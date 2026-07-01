import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpCode, Post, Request, UseGuards} from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { ApiResponse } from 'src/util/ApiResponse.util';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    // Register Flow
    @Public()
    @Post("/register")
    @HttpCode(201)
    async createUser(@Body() registerUserDto : RegisterUserDto):Promise<ApiResponse>{

        const token = await this.AuthService.register(registerUserDto);
        console.log("response : ",token);
        
        return new ApiResponse(201, "user created", {access_token : token});
    }

    // logIn Flow
    @Public()
    @Post("/login")
    @HttpCode(200)
    async logIn(@Body()loginUserDto:LoginUserDto):Promise<ApiResponse>{
        
        console.log("loginUserDto inside LogIn ",loginUserDto);

        const token = await this.AuthService.logIn(loginUserDto);

        return new ApiResponse(201, "LogIn successful", {access_token : token});
    }

    // Profile Flow
    // @UseGuards(AuthGuard)
    @Get("/profile")
    @HttpCode(200)
    async profile(@Request() req):Promise<ApiResponse>{
        
        const userId = req.user.sub;

        const user = await this.AuthService.profile(userId);

        return new ApiResponse(200, "Profile Data", user);
    }
}

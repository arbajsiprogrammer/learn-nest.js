import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

    private readonly UserService: UserService;


    constructor( UserService: UserService){
        this.UserService = UserService;

    }

    

    // create new user
    @Post()
    createUser(@Body()data){
        return this.UserService.createUser(data);
    }

    
    
}

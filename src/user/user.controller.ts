import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    private readonly UserService: UserService;

    constructor( UserService: UserService){
        this.UserService = UserService;
    }

    // get all users 
    // @Get()
    // getUsers(){
    //     return this.UserService.getUsers();
    // }

    // get one user 
    // @Get(":id")
    // getUser(@Param("id")userId:string){
    //     return this.UserService.getUser(userId);
    // }

    // create new user
    @Post()
    createUser(@Body()data){
        return this.UserService.createUser( data);
    }

    // edit user
    // @Put(":id")
    // updateUser(@Param("id") userId:string, @Body()data){
    //     return this.UserService.updateUser(userId, data);
    // }

    //  // delete user
    // @Delete(":id")
    // deleteUser(@Param("id") userId:string){
    //     return this.UserService.deleteUser(userId);
    // }
    
}

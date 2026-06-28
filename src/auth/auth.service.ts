import { LoginUserDto } from './../user/dto/loginUser.dto';

import { RegisterUserDto } from '../user/dto/registerUser.dto';
import { UserService } from './../user/user.service';
import {  Injectable} from '@nestjs/common';

import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly UserService : UserService, private readonly jwtService : JwtService){}
    
    // steps :=>
    // 1. check if email already exists 
    // 2. hash the password
    // 3. store user into DB
    // 4. generate JWT tokens
    // 5. send token into response
    
    async register(registerUserDto : RegisterUserDto){
        // hash the password before storing into DB
        const salt = await bcrypt.genSalt();;
        const password = registerUserDto.password;
        const hash = await bcrypt.hash(password, salt);

        registerUserDto.password = hash;

        const createdUser = await this.UserService.createUser(registerUserDto);

        console.log("createdUser inside the register method : ", createdUser)

        const payload = {sub : createdUser._id}

        const token = await this.jwtService.signAsync(payload);

        return token;
    }

    // logIn steps :=> 
    // 1. get email and password 
    // 2. match email and password
    // 3. Generate JWT token 

    async logIn(loginUserDto:LoginUserDto){

        const user = await this.UserService.getUser(loginUserDto);
        
        const payload = {sub : user._id}

        const token = await this.jwtService.signAsync(payload);

        return token;

    }

    // get user profile 
    async profile (id:string){
      
      const user = await this.UserService.getUserById(id);

      return user;
    }
}

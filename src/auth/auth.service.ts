import { ApiResponse } from 'src/util/ApiResponse.util';
import { CreateUserDto } from './../user/dto/create-user.dto';
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
    
    async register(createUserDto : CreateUserDto){
        // hash the password before storing into DB
        const salt = await bcrypt.genSalt();;
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, salt);

        createUserDto.password = hash;

        const createdUser = await this.UserService.createUser(createUserDto);

        console.log("createdUser inside the register method : ", createdUser)

        const payload = {sub : createdUser._id}

        const token = await this.jwtService.signAsync(payload);
        
        return createdUser;
    }

}

import { ApiResponse } from 'src/util/ApiResponse.util';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import {  Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor(private readonly UserService : UserService){}
    
    async register(CreateUserDto : CreateUserDto){
        const user = this.UserService.createUser(CreateUserDto);
        return new ApiResponse(201, "userCreated", user);
    }
}

import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import {  Injectable} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private readonly UserService : UserService){}
    
    async register(CreateUserDto : CreateUserDto){
        const user = UserService.createUser();
    }
}

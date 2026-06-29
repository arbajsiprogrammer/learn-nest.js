import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import bcrypt from "bcrypt";
import { DUPLICATE_KEY_CODE } from 'src/common/enums/roles.enum';



@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // Register
    async createUser(registerUserDto:RegisterUserDto){

      try {
        console.log("createUserDto inside User service : ", registerUserDto);
      
        const createdUser = new this.userModel(registerUserDto);

        const user =  await createdUser.save();
        return user;
      } catch (error:unknown) {
        console.log("************************error******************************* : ", error)
        const e = error as {code?:number, errmsg?:string};

        if(e.code == DUPLICATE_KEY_CODE){
          throw new ConflictException(e.errmsg || "Duplicate Key error");
        }

        throw new InternalServerErrorException(error);
        
      }
    }

    // get  user
    async getUser(loginUserDto:LoginUserDto){
      
        const email = loginUserDto.email;


        const password = loginUserDto.password as string;

        const user = await this.userModel.findOne({email});

        if(!user){
          throw new NotFoundException(`User with email ${email} not found`);
        }

        const isMatched = await bcrypt.hash(password, user.password);

        if(!isMatched){
          throw new UnauthorizedException("Password not matched");
        }

        return user;

    }

    // get user by Id
    async getUserById(id:string){
      
        console.log(id, " ID inside getUserById");

        const user = await this.userModel.findById(id);

        if(!user){
          throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }
    

    
}

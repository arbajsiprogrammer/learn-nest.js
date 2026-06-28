import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DUPLICATE_KEY_CODE } from 'src/user/constants/user.constants';
import { LoginUserDto } from './dto/loginUser.dto';
import bcrypt from "bcrypt";
import { JwtModule } from '@nestjs/jwt';

// export interface IUser {
//     id: string,
//     name: string,
//     email: string,
//     role: "student" | "instructor" | "admin",
//     course: string | null,
//     enrolled: boolean,
// }

// export interface IData {
//     name: string,
//     email: string,
//     role: "student" | "instructor" | "admin",
//     course: string | null,
//     enrolled: boolean,
// }

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
    // get all users
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

    

    
}

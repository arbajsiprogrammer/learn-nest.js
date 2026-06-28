import { ConflictException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DUPLICATE_KEY_CODE } from 'src/user/constants/user.constants';

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
    
    private users= [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun.sharma@lms.com",
    role: "student",
    course: "NestJS Fundamentals",
    enrolled: true,
  },
  {
    id: "2",
    name: "Priya Patil",
    email: "priya.patil@lms.com",
    role: "student",
    course: "TypeScript Essentials",
    enrolled: true,
  },
  {
    id: "3",
    name: "Rahul Verma",
    email: "rahul.verma@lms.com",
    role: "student",
    course: "Node.js Masterclass",
    enrolled: false,
  },
  {
    id: "4",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@lms.com",
    role: "instructor",
    course: "NestJS Fundamentals",
    enrolled: true,
  },
  {
    id: "5",
    name: "Amit Joshi",
    email: "amit.joshi@lms.com",
    role: "instructor",
    course: "MongoDB for Beginners",
    enrolled: true,
  },
  {
    id: "6",
    name: "Neha Gupta",
    email: "neha.gupta@lms.com",
    role: "student",
    course: "Express.js",
    enrolled: true,
  },
  {
    id: "7",
    name: "Vikram Singh",
    email: "vikram.singh@lms.com",
    role: "student",
    course: "JavaScript Basics",
    enrolled: true,
  },
  {
    id: "8",
    name: "Pooja Mehta",
    email: "pooja.mehta@lms.com",
    role: "student",
    course: "Data Structures & Algorithms",
    enrolled: false,
  },
  {
    id: "9",
    name: "Karan Deshmukh",
    email: "karan.deshmukh@lms.com",
    role: "admin",
    course: null,
    enrolled: true,
  },
  {
    id: "10",
    name: "Anjali Rao",
    email: "anjali.rao@lms.com",
    role: "student",
    course: "React.js",
    enrolled: true,
  },
];

    // get all users
    // getUsers(){
    //     return this.users;
    // }

    // // get single user
    // getUser(id:string){
    //     const user =  this.users.find((u)=> u.id == id);

    //     if(!user){
    //         throw new NotFoundException(`user with id : ${id} not found...`)
    //     }
        
    //     return user;
    // }

    async createUser(createUserDto:CreateUserDto){

      try {
        console.log("createUserDto inside User service : ", createUserDto);
      
        const createdUser = new this.userModel(createUserDto);

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

    // updateUser(id:string, CreateUserDto:CreateUserDto){
    //     this.getUser(id);

    //     this.users = this.users.map((u)=> {

    //         if(u.id != id){
    //             return u;
    //         }else {
    //             return {//id,
    //              ...CreateUserDto};
    //         }
    //     });

    //     return this.users;
    // }

    // deleteUser(id:string){
    //     this.getUser(id);

    //     this.users = this.users.filter((u)=> u.id != id);

    //     return this.users;
    // }
}

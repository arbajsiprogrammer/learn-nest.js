import { Injectable, NotFoundException, Param } from '@nestjs/common';

export interface IUser {
    id: string,
    name: string,
    email: string,
    role: "student" | "instructor" | "admin",
    course: string | null,
    enrolled: boolean,
}

export interface IData {
    name: string,
    email: string,
    role: "student" | "instructor" | "admin",
    course: string | null,
    enrolled: boolean,
}

@Injectable()
export class UserService {
    
    private users:IUser[] = [
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
    getUsers():IUser[]{
        return this.users;
    }

    // get single user
    getUser(id:string):IUser{
        const user =  this.users.find((u)=> u.id == id);

        if(!user){
            throw new NotFoundException(`user with id : ${id} not found...`)
        }
        
        return user;
    }

    createUser(data:IData):IUser[]{
        const user:IUser = {id:crypto.randomUUID().toString(), ...data};

        this.users.push(user);

        return this.users;
    }

    updateUser(id:string, data: IData):IUser[]{
        this.getUser(id);

        this.users = this.users.map((u)=> {

            if(u.id != id){
                return u;
            }else {
                return {id, ...data};
            }
        });

        return this.users;
    }

    deleteUser(id:string):IUser[]{
        this.getUser(id);

        this.users = this.users.filter((u)=> u.id != id);

        return this.users;
    }
}

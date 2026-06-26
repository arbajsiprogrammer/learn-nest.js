
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRoles{
    STUDENT    = 'student',
    INSTRUCTOR = 'instructor',
    ADMIN      = 'admin',
    MODERATOR  = 'moderator',
}

@Schema({timestamps:true})
export class User {
  @Prop({required: true, trim:true})
  fname! : string;

  @Prop({required: true, trim:true})
  lname! : string;

  @Prop({required: true, trim:true, unique:true, lowercase:true})
  email! : string;

  @Prop({required: true})
  password!: string;

  @Prop({default:null})
  phone! : string;

  @Prop({type:String, enum:UserRoles, required:true})
  role! : UserRoles;

  @Prop({default:null})
  deletedAt! : Date
  
}

export const UserSchema = SchemaFactory.createForClass(User);

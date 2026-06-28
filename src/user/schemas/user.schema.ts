
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../user.types';

export type UserDocument = HydratedDocument<User>;


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

  @Prop({type: String, enum:UserRoles, default:UserRoles.STUDENT})
  role! : UserRoles;

  @Prop({type: String, required:true, trim:true})
  course! : string

  @Prop({default:null})
  deletedAt! : Date
  
}

export const UserSchema = SchemaFactory.createForClass(User);

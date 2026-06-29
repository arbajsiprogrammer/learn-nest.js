

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CourseStatus, Level } from '../constants/cource.constants';
import { User } from 'src/user/schemas/user.schema';

export type CourseDocument = HydratedDocument<Course>;


@Schema({timestamps:true})

export class Course {

  @Prop({required: true, trim:true, unique:true})
  title! : string;

  @Prop({required: true, trim:true})
  description! : string;

  @Prop({required: true, type:mongoose.Schema.Types.ObjectId, ref:User.name})
  instructor! : mongoose.Types.ObjectId;

  @Prop({required: true, default:0})
  price!: number;

  @Prop({default:false})
  isFree! : boolean;

  @Prop({type: String, enum:CourseStatus, default:CourseStatus.DRAFT})
  status! : CourseStatus;

  @Prop({type: String, required:true, trim:true, enum:Level})
  level! : Level

  @Prop({default:null})
  deletedAt! : Date
  
}

export const CourseSchema = SchemaFactory.createForClass(Course);

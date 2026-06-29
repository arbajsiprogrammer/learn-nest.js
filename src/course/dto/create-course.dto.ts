import mongoose from "mongoose";
import { CourseStatus, Level } from "../constants/cource.constants";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateCourseDto {

     @IsNotEmpty()
      @IsString()
      title! : string;
    
      @IsString()
      @IsNotEmpty()
      description! : string;
    
      @IsString()
      @IsNotEmpty()
      instructor! : string;
    
      @Min(0)
      @IsOptional()
      @IsNumber()
      price!: number;
    
      @IsOptional()
      @IsBoolean()
      isFree! : boolean;
    
    //   @IsEnum(CourseStatus)
    //   status! : CourseStatus;
    
      @IsEnum(Level)
      level! : Level
    
    //   @IsDate()
    //   deletedAt! : Date
      
}

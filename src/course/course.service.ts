import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import   { Model} from 'mongoose';
import { Course } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {

  constructor(@InjectModel(Course.name) private readonly courseModel : Model<Course>){}

  async create(createCourseDto: CreateCourseDto) {
    // 1. check  existing course 
    // 2. add new
    
    // ^ start of the string
    // $ end of the string 
    // i case insensitive
    // ^...content...$ ==> help use to match entire string (ensures that the entire string is of regex content)
    const dbCourse = await this.findAll({title : {
      $regex: new RegExp(`^${createCourseDto.title}$`, 'i')
    }});

    if(dbCourse.length > 0){
      throw new ConflictException(`course with title ${createCourseDto.title} already exist`);
    }

    const createdCourse =  new this.courseModel(createCourseDto);

    return await createdCourse.save();
  }

  async findAll(fields:Record<string, unknown>) {
    const courses = await this.courseModel.find({...fields})
    return courses;
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id);

    if(!course){
      throw new NotFoundException(`Course with id ${id} not found `)
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel.findByIdAndUpdate(id, updateCourseDto);

    if(!course){
      throw new NotFoundException(`Course with id ${id} not found `)
    }

    return course;
  }

  async remove(id: string) {
    const course = await this.courseModel.findByIdAndDelete(id);

    if(!course){
      throw new NotFoundException(`Course with id ${id} not found `)
    }

    return course;
  }
}

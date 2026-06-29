import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiResponse } from 'src/util/ApiResponse.util';
import { InjectModel } from '@nestjs/mongoose';

@Controller('course')
export class CourseController {
  constructor( private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const createdCourse = await this.courseService.create(createCourseDto);

    return new ApiResponse(201, "course created", createdCourse);
  }

  @Get()
  async findAll() {
    const courses = await this.courseService.findAll({});

    return new ApiResponse(200, "courses data fetched", courses)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course =await this.courseService.findOne(id);

    return new ApiResponse(200, "courses data fetched", course)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    
    const course = await this.courseService.update(id, updateCourseDto);

    return new ApiResponse(200, "courses data fetched", course)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    const course = await this.courseService.remove(id);

    return new ApiResponse(200, "courses data fetched", course)
  }
}

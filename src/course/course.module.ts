import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]), 
    
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { 
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRY') as any
          },
        }),
        inject: [ConfigService],
      })
    ],

  controllers: [CourseController],
  
  providers: [CourseService],
})
export class CourseModule {}

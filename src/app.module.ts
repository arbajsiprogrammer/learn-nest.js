import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  ConfigModule.forRoot({
      isGlobal:true
    }), 

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
      uri: configService.get<string>('DATABASE_URI'),
    }),
    inject: [ConfigService],
  }),

  UserModule,
  AuthModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})


export class AppModule {}

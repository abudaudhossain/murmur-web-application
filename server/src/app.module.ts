import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { Follow } from './entities/follow.entity';
import { FollowModule } from './follow/follow.module';
import { Murmur } from './entities/murmur.entity';
import { Media } from './entities/media.entity';
import { Like } from './entities/like.entity';
import { MurmurModule } from './murmur/murmur.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User, Follow, Murmur, Media, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule, 
    FollowModule,
    MurmurModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule { }

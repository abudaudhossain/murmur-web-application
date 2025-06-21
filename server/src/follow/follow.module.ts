import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { Follow } from 'src/entities/follow.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Follow]), UserModule],
    providers: [FollowService],
    controllers: [FollowController],
    exports: [FollowService]
})
export class FollowModule { }

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { Like } from "src/entities/like.entity";
import { Media } from "src/entities/media.entity";
import { Murmur } from "src/entities/murmur.entity";
import { UserModule } from "src/user/user.module";
import { MurmurController } from "./murmur.controller";
import { MurmurService } from "./murmur.service";
import { FollowModule } from "src/follow/follow.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Murmur, Media, Like]),
        UserModule,
        FollowModule
    ],
    providers: [MurmurService],
    controllers: [MurmurController],
})
export class MurmurModule { }
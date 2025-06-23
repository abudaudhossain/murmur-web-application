import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Like } from "src/entities/like.entity";
import { Media } from "src/entities/media.entity";
import { Murmur } from "src/entities/murmur.entity";
import { FollowService } from "src/follow/follow.service";
import { In, Not, Repository } from "typeorm";

@Injectable()
export class MurmurService {
    constructor(
        @InjectRepository(Murmur) private murmurRepo: Repository<Murmur>,
        @InjectRepository(Media) private mediaRepo: Repository<Media>,
        @InjectRepository(Like) private likeRepo: Repository<Like>,
        private readonly followService: FollowService,
    ) { }

    async createMurmur(content: string, userId: number, mediaInput: { url: string; type: 'image' | 'video' }) {
        if (!content && (!mediaInput)) {
            throw new NotFoundException('Content or media is required');
        }
        if (!userId) {
            throw new NotFoundException('Content and User ID are required');
        }

        const murmur = this.murmurRepo.create({ content, userId });
        if (mediaInput) {

            murmur.media = this.mediaRepo.create(mediaInput);
        }
        return await this.murmurRepo.save(murmur);
    }

    async likeMurmur(murmurId: number, userId: number) {
        if (!murmurId || !userId) {
            throw new NotFoundException('Murmur ID and User ID are required');
        }
        const murmur = await this.murmurRepo.findOne({ where: { id: murmurId } });
        if (!murmur) {
            throw new NotFoundException('Murmur not found');
        }
        const existingLike = await this.likeRepo.findOne({
            where: { murmurId, userId },
        });
        if (existingLike) {
            throw new NotFoundException('You have already liked this murmur');
        }

        const like = this.likeRepo.create({ murmurId, userId });
        return this.likeRepo.save(like);
    }

    async unlikeMurmur(murmurId: number, userId: number) {

        const existingLike = await this.likeRepo.findOne({
            where: { murmurId, userId },
        });
        if (!existingLike) {
            throw new NotFoundException('You have not liked this murmur yet');
        }

        await this.likeRepo.remove(existingLike);
        return { message: 'Like removed successfully' };
    }

    async getMurmurs() {
        return this.murmurRepo.find({ relations: ['media', 'likes'], order: { createdAt: 'DESC' } });
    }

    async getMurmurById(id: number) {
        const murmur = await this.murmurRepo.findOne({
            where: { id },
            relations: ['media', 'likes'],
        });
        if (!murmur) {
            throw new NotFoundException('Murmur not found');
        }
        return murmur;
    }

    async deleteMurmur(id: number, userId: number) {
        if (!id) {
            throw new NotFoundException('Murmur ID is required');
        }
        const murmur = await this.murmurRepo.findOne({ where: { id, userId } });
        if (!murmur) {
            throw new NotFoundException('Murmur not found or you do not have permission to delete it');
        }
        await this.murmurRepo.remove(murmur);
        return { message: 'Murmur deleted successfully' };
    }

    async meMurmurs(userId: number, page = 1, limit = 10) {
        if (!userId) {
            throw new NotFoundException('User ID is required');
        }

        const skip = (page - 1) * limit;

        const whereCondition = { userId }
        
        const [murmurs, total] = await this.murmurRepo.findAndCount({
            where: whereCondition,
            relations: ['media', 'likes', 'user'],
            order: { createdAt: 'DESC' }, // sort by createdAt (latest first)
            skip,
            take: limit,
        });

        return {
            data: plainToInstance(Murmur, murmurs),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };

    }

    async getTimelineMurmur(userId: number, page = 1, limit = 10) {

        if (!userId) {
            throw new NotFoundException('User ID is required');
        }
        const followingIds = await this.followService.followingIds(userId);
        if (!followingIds || followingIds.length === 0) {
            throw new NotFoundException('No following users found');
        }


        const skip = (page - 1) * limit;

        const whereCondition = followingIds?.length
            ? { userId: In([...followingIds, userId]) }
            : {};

        const [murmurs, total] = await this.murmurRepo.findAndCount({
            where: whereCondition,
            relations: ['media', 'likes', 'user'],
            order: { createdAt: 'DESC' }, // sort by createdAt (latest first)
            skip,
            take: limit,
        });

        return {
            data: plainToInstance(Murmur, murmurs),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };

    }
}
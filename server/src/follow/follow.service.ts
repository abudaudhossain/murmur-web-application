import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follow } from "src/entities/follow.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow) private followRepo: Repository<Follow>,
        private readonly userService: UserService
    ) { }

    async followUser(currentUserId: number, targetUserId: number) {
        if (currentUserId === targetUserId) {
            throw new Error('You cannot follow yourself');
        }

        const targetUser = await this.userService.findUserById(targetUserId);
        if (!targetUser) throw new NotFoundException('User to follow not found');

        const follow = this.followRepo.create({
            followerId: currentUserId,
            followingId: targetUserId,
        });

        return await this.followRepo.save(follow);
    }

    async unfollowUser(currentUserId: number, targetUserId: number) {
        if (currentUserId === targetUserId) {
            throw new Error('You cannot unfollow yourself');
        }

        const follow = await this.followRepo.findOne({
            where: {
                followerId: currentUserId,
                followingId: targetUserId,
            },
        });

        if (!follow) {
            throw new NotFoundException('Follow relationship not found');
        }

        await this.followRepo.remove(follow);
        return { message: 'Unfollowed successfully' };
    }

    async getFollowing(currentUserId: number) {
        const follows = await this.followRepo.find({
            where: { followerId: currentUserId },
            relations: ['following'],
        });

        return follows.map(follow => ({
            id: follow.following.id,
            email: follow.following.email,
            name: follow.following.name,
            isActive: follow.following.isActive
        }));
    }

    async getFollowers(targetUserId: number) {
        const follows = await this.followRepo.find({
            where: { followingId: targetUserId },
            relations: ['follower'],
        });

        return follows.map(follow => ({
            id: follow.follower.id,
            email: follow.follower.email,
            name: follow.follower.name,
            isActive: follow.follower.isActive
        }));
    }

    async followingIds(currentUserId: number) {
        const follows = await this.followRepo.find({
            where: { followerId: currentUserId },
            select: ['followingId'],
        });

        return follows.map(follow => follow.followingId);
    }
}
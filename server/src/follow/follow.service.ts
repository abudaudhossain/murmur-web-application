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

    async getFollowing(currentUserId: number, page = 1, limit = 10) {
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const skip = (page - 1) * limit;
        const [follows, total] = await this.followRepo.findAndCount({
            where: { follower: { id: currentUserId } },
            relations: ['following', 'following.followers', 'following.following'],
            order: { createdAt: 'DESC' }, // or order by 'createdAt' if you have that column
            skip,
            take: limit,
        });

        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            following: follows.map(follow => {
                const following = follow.following;

                return {
                    id: following.id,
                    email: following.email,
                    name: following.name,
                    isActive: following.isActive,
                    avatar: "",
                    followersCount: following.followers.length,
                    followingCount: following.following.length,
                    isFollowing: true, // because you're getting users the current user follows
                };
            }),
        };
    }


    async getFollowers(targetUserId: number, page = 1, limit = 10) {
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const skip = (page - 1) * limit;
        console.log(targetUserId)
        const [follows, total] = await this.followRepo.findAndCount({
            where: { followingId: targetUserId  },
            relations: ['follower', 'follower.followers', 'follower.following'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });

        console.log(follows, total, page, limit, skip)
        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            followers: follows.map(follow => {
                const follower = follow.follower;

                return {
                    id: follower.id,
                    email: follower.email,
                    name: follower.name,
                    isActive: follower.isActive,
                    avatar: "",
                    followersCount: follower.followers.length,
                    followingCount: follower.following.length,
                    isFollowing: follower.followers.some(f => f.followerId === targetUserId),
                };
            }),
        };
    }



    async followingIds(currentUserId: number) {
        const follows = await this.followRepo.find({
            where: { followerId: currentUserId },
            select: ['followingId'],
        });
        return follows.map(follow => follow.followingId);
    }

    async suggestFollowing(currentUserId: number, page: number = 1, limit: number = 5) {
        const followingIds: number[] = await this.followingIds(currentUserId)

        return this.userService.getFollowSuggestUser(followingIds, page, limit)
    }

}
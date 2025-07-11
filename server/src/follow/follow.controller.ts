import { Controller, Post, Delete, Param, UseGuards, Request, Get, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) { }

    @Post(':id')
    async follow(@Request() req, @Param('id') targetUserId: number) {
        const user = await req.user;
        return this.followService.followUser(user.id, Number(targetUserId));
    }

    @Delete(':id')
    async unfollow(@Request() req, @Param('id') targetUserId: number) {
        const user = await req.user;
        return this.followService.unfollowUser(user.id, Number(targetUserId));
    }

    @Get('followers')
    async myFollowers(@Request() req, @Query('page') page: number,
        @Query('limit') limit: number) {
        const user = await req.user;
        return this.followService.getFollowers(user.id, page, limit);
    }

    @Get('following')
    async myFollowing(@Request() req, @Query('page') page: number,
        @Query('limit') limit: number) {
        const user = await req.user;
        return this.followService.getFollowing(user.id, page, limit);
    }

    @Get("suggest")
    async mySuggestUser(
        @Request() req,
        @Query('page') page: number,
        @Query('limit') limit: number,) {
        const user = await req.user;
        return this.followService.suggestFollowing(user.id, page, limit)
    }
}

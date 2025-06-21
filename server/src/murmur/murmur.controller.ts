
import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
    Body,
    UseGuards,
    Request,
    Req,
    Delete,
    Get,
    Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MurmurService } from './murmur.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
});

@UseGuards(JwtAuthGuard)
@Controller('murmurs')
export class MurmurController {
    constructor(private readonly murmurService: MurmurService) { }


    @Post('create')
    @UseInterceptors(FilesInterceptor('media', 5, { storage }))
    async createMurmur(
        @Request() req,
        @UploadedFiles() files: Express.Multer.File[],
        @Body('content') content: string,
    ) {
        console.log('Files received:', files);
        let media: { url: string, type: 'image' | 'video' }[] = [];
        if (files || files?.length) {
            media = files.map(file => ({
                url: `/uploads/${file.filename}`,
                type: file.mimetype.includes('video') ? 'video' : 'image',
            }));
        }

        const user = await req.user;
        return this.murmurService.createMurmur(content, user.id, media);
    }

    @Post('like/:id')
    async likeMurmur(@Request() req,@Param('id')  murmurId: number) {
        const user = await req.user;
        return this.murmurService.likeMurmur(murmurId, user.id);
    }

    @Delete('unlike/:id')
    async unlikeMurmur(@Request() req,@Param('id')  murmurId: number) {
        const user = await req.user;
        return this.murmurService.unlikeMurmur(murmurId, user.id);
    }

    @Get('get')
    async getMurmurs(@Request() req) {
        const user = await req.user;
        return this.murmurService.getMurmurs();
    }

    @Get("timeline")
    async getTimeline(@Request() req) {
        const user = await req.user;
        return this.murmurService.getTimelineMurmur(user.id);
    }

    @Get('get/:id')
    async getMurmurById(@Req() req) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid murmur ID');
        }
        return this.murmurService.getMurmurById(id);
    }

    @Delete('me/delete/:id')
    async deleteMurmur(@Req() req) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid murmur ID');
        }
        const user = await req.user;
        return this.murmurService.deleteMurmur(id, user.id);
    }

    @Get('me')
    async getMyMurmurs(@Request() req) {
        const user = await req.user;
        return this.murmurService.meMurmurs(user.id);
    }

}

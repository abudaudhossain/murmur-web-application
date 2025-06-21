import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt.guard";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { 
      

    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        console.log('Registering user:', body);
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
   async getProfile(@Req() req: any) {
        const user =await req.user;
        console.log('Getting profile for user:', user);
        return this.userService.getUserProfile(user.id); 
    }


}
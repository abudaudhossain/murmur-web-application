import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }
    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return false;
        }

        const token = authHeader.split(' ')[1]; 

        try {
            const decoded = this.authService.verifyToken(token);
            request.user = decoded; 
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token'); 
        }
    }
}
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UserService } from "src/user/user.service";

import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(userData: CreateUserDto) {
        try {
            const existingUser = await this.userService.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            // password hashing can be added here
            const password = userData.password;
            if (!password || password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userService.createUser({
                ...userData,
                password: hashedPassword
            });
            return {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                isActive: newUser.isActive
            };
        } catch (error) {
            console.log('Registration error:', error);
            throw new Error(`Registration failed: ${error.message}`);

        }
    }

    async login(email: string, password: string) {

        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }
        const user = await this.userService.findByEmail(email);
        console.log('User found:', user);
        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid email or password');
        }
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isActive: user.isActive
            }

        }
    }

    async verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userService.findUserById(decoded.sub);

            if (!user) {
                throw new Error('User not found');
            }
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                isActive: user.isActive
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
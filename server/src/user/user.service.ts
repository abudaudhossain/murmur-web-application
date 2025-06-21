import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(@Body() dto: CreateUserDto) {
        // Create a new user instance and save it
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
    async updateUser(id: number, dto: Partial<CreateUserDto>) {
        await this.userRepository.update(id, dto);
        return this.findUserById(id);
    }
    async deleteUser(id: number) {
        const user = await this.findUserById(id);
        if (user) {
            await this.userRepository.delete(id);
            return user;
        }
        return null;
    }

    async getUserProfile(id: number) {
        if (!id) {
            throw new NotFoundException('User ID is required');
        }
        const user = await this.userRepository.findOne({
            where: { id },
            relations: [
                'followers',              // Follow entity
                'followers.follower',     // Nested User
                'following',              // Follow entity
                'following.following'     // Nested User
            ]
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            isActive: user.isActive,

            followers: user.followers.map(f => ({
                id: f.follower.id,
                email: f.follower.email,
                name: f.follower.name,
                isActive: f.follower.isActive,
            })),

            following: user.following.map(f => ({
                id: f.following.id,
                email: f.following.email,
                name: f.following.name,
                isActive: f.following.isActive,
            })),
        };
    }

}

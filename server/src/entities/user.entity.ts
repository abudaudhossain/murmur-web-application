import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Follow } from "./follow.entity";
import { Murmur } from "./murmur.entity";
import { Like } from "./like.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => Follow, follow => follow.follower)
    following: Follow[];
    @OneToMany(() => Follow, follow => follow.following)
    followers: Follow[];

    @OneToMany(() => Murmur, murmur => murmur.user)
    murmurs: Murmur[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];
}
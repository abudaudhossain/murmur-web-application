import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('follows')
export class Follow {
    @PrimaryColumn()
    followerId: number;

    @PrimaryColumn()
    followingId: number;

    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    follower: User;
    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    following: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
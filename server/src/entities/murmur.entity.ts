import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Media } from "./media.entity";
import { Like } from "./like.entity";

@Entity('murmurs')
export class Murmur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: null })
    content: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.murmurs, { onDelete: 'CASCADE' })
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => Media, media => media.murmur, { cascade: true })
    media: Media;

    @OneToMany(() => Like, like => like.murmur)
    likes: Like[];

}
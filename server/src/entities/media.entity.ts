import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Murmur } from './murmur.entity';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ type: 'enum', enum: ['image', 'video'] })
    type: 'image' | 'video';

    @OneToOne(() => Murmur, murmur => murmur.media, { onDelete: 'CASCADE' })
    @JoinColumn()
    murmur: Murmur;
}

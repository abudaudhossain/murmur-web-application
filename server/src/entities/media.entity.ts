import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Murmur } from './murmur.entity';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ type: 'enum', enum: ['image', 'video'] })
    type: 'image' | 'video';

    @ManyToOne(() => Murmur, murmur => murmur.media, { onDelete: 'CASCADE' })
    murmur: Murmur;
}

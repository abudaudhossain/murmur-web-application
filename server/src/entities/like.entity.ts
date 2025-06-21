import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Murmur } from './murmur.entity';
import { User } from './user.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    @ManyToOne(()=>User , user => user.likes, { onDelete: 'CASCADE' })
    user: User;
    
    @Column()
    murmurId: number;
    @ManyToOne(() => Murmur, murmur => murmur.likes, { onDelete: 'CASCADE' })
    murmur: Murmur;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
}

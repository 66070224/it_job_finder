import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender!: User;

  @Column({ type: 'uuid' })
  sender_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver!: User;

  @Column({ type: 'uuid' })
  receiver_id!: string;

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn()
  created_at!: Date;
}

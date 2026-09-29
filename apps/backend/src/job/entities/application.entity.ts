import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from './job.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWed = 'reviewed',
  INTERVIEW = 'interview',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Job)
  job!: Job;

  @Column({
    type: 'enum',
    enum: Application,
    default: ApplicationStatus.PENDING,
  })
  status!: ApplicationStatus;

  @Column({
    type: 'text',
  })
  message!: string | null;

  @CreateDateColumn()
  applied_at!: Date;
}

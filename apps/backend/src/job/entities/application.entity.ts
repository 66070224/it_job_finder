import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { File } from 'src/file/entities/file.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  INTERVIEW = 'interview',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity()
@Unique(['user', 'job'])
export class Application {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Job)
  job!: Job;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status!: ApplicationStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  message!: string | null;

  @Column({ type: 'jsonb' })
  profile_snapshot!: Record<string, unknown>;

  @ManyToMany(() => File)
  files!: File[];

  @CreateDateColumn()
  applied_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

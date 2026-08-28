import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text' })
  institution!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'smallint' })
  start_year!: number;

  @Column({ type: 'smallint', nullable: true })
  end_year!: number | null;

  @ManyToOne(() => Profile, (profile) => profile.educations)
  profile!: Profile;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}

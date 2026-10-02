import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text' })
  key!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToOne(() => Profile, (profile) => profile.files)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  profile!: Profile;

  @Column({ type: 'uuid' })
  user_id!: string;

  @CreateDateColumn()
  uploaded_at!: Date;
}

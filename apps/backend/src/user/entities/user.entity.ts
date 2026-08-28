import { Auth } from 'src/auth/entities/auth.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  JOB_SEEKER = 'JOB_SEEKER',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

export type PublicUserRole = UserRole.JOB_SEEKER | UserRole.COMPANY;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @OneToMany(() => Auth, (auth) => auth.user)
  auth!: Auth[];

  @Column({ type: 'boolean', default: false })
  email_verified!: boolean;

  @Column({ type: 'text', nullable: true })
  avatar_url!: string | null;

  @Column('text')
  first_name!: string;

  @Column('text')
  last_name!: string;

  @Column({ type: 'enum', enum: UserRole, nullable: true })
  role!: UserRole | null;

  @Column({ type: 'boolean', default: false })
  is_profile!: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}

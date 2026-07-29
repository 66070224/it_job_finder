import { Auth } from 'src/auths/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  JOB_SEEKER = 'JOB_SEEKER',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @OneToMany(() => Auth, (auth) => auth.user)
  auth!: Auth[];

  @Column('boolean')
  email_verified!: boolean;

  @Column({ type: 'text', nullable: true })
  avatar_url!: string | null;

  @Column('text')
  first_name!: string;

  @Column('text')
  last_name!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column({ type: 'boolean', default: false })
  profileCompleted!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}

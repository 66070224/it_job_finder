import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum ProviderType {
  PASSWORD = 'PASSWORD',
  GOOGLE = 'GOOGLE',
}

@Entity()
@Unique(['user', 'provider_type'])
@Unique(['provider_type', 'provider_user_id'])
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.auth)
  user!: User;

  @Column({ type: 'enum', enum: ProviderType })
  provider_type!: ProviderType;

  @Column({ type: 'text', nullable: true })
  provider_user_id!: string | null;

  @Column({ type: 'text', nullable: true })
  hashed_password!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}

import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum ProviderTypes {
  PASSWORD = 'PASSWORD',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

@Entity('auths')
@Unique(['user', 'provider_type'])
@Unique(['provider_type', 'provider_user_id'])
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.auth)
  user!: User;

  @Column({ type: 'enum', enum: ProviderTypes })
  provider_type!: ProviderTypes;

  @Column({ type: 'text', nullable: true })
  provider_user_id!: string | null;

  @Column({ type: 'text', nullable: true })
  hashed_password!: string | null;
}

import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum provider_types {
  PASSWORD = 'PASSWORD',
  GMAIL = 'GMAIL',
}

@Entity('auths')
@Unique(['user', 'provider_type'])
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.auth)
  user!: User;

  @Column({ type: 'enum', enum: provider_types })
  provider_type!: provider_types;

  @Column({ type: 'text', nullable: true })
  provider_user_id!: string | null;

  @Column({ type: 'text', nullable: true })
  hashed_password!: string | null;
}

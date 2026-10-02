import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Company } from './company.entity';

export enum CompanyMemberRole {
  OWNER = 'o',
  MEMBER = 'm',
}

export enum CompanyMemberStatus {
  PENDING = 'p',
  ACCEPTED = 'a',
  REJECTED = 'r',
}

@Entity()
@Unique(['user_id', 'company_id'])
export class CompanyMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company!: Company;

  @Column({ type: 'uuid' })
  company_id!: string;

  @Column({ type: 'enum', enum: CompanyMemberRole })
  role!: CompanyMemberRole;

  @Column({
    type: 'enum',
    enum: CompanyMemberStatus,
    default: CompanyMemberStatus.PENDING,
  })
  status!: CompanyMemberStatus;
}

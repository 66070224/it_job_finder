import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
export class CompanyMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  user!: User;

  @ManyToOne(() => Company)
  company!: Company;

  @Column({ type: 'enum', enum: CompanyMemberRole })
  role!: CompanyMemberRole;

  @Column({
    type: 'enum',
    enum: CompanyMemberStatus,
    default: CompanyMemberStatus.PENDING,
  })
  status!: CompanyMemberStatus;
}

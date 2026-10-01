import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyInfo } from './company-info.entity';
import { Job } from 'src/job/entities/job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  logo_url!: string | null;

  @Column({ type: 'text' })
  address!: string;

  @OneToOne(() => CompanyInfo, (companyInfo) => companyInfo.company)
  company_info!: CompanyInfo;

  @OneToMany(() => Job, (job) => job.company)
  jobs!: Job[];
}

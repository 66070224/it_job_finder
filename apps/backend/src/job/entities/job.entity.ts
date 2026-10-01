import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobInfo } from './job_info.entity';

export enum EmploymentType {
  FULL_TIME = 'f',
  PART_TIME = 'p',
  INTERNSHIP = 'i',
  CONTRACT = 'c',
}
export enum ArrangementType {
  OFFICE = 'o',
  REMOTE = 'r',
  HYBRID = 'h',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Company, (company) => company.jobs)
  company!: Company;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'int', nullable: true })
  salary_min!: number | null;

  @Column({ type: 'int', nullable: true })
  salary_max!: number | null;

  @Column({ type: 'int', nullable: true })
  experience!: number | null;

  @Column({ type: 'enum', enum: EmploymentType })
  employment_type!: EmploymentType;

  @Column({ type: 'enum', enum: ArrangementType })
  arrangement!: ArrangementType;

  @Column({ type: 'int', nullable: true })
  capacity!: number;

  @OneToOne(() => JobInfo, (jobInfo) => jobInfo.job)
  job_info!: JobInfo;

  @CreateDateColumn()
  created_at!: Date;
}

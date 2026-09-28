import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Company)
  company!: Company;

  @Column({ type: 'text', nullable: false })
  title!: string;

  @CreateDateColumn()
  created_at!: Date;
}

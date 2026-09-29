import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class CompanyInfo {
  @PrimaryColumn()
  company_id!: string;

  @OneToOne(() => Company, (company) => company.company_info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company!: Company;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', array: true })
  contacts!: string[];

  @Column({ type: 'text', nullable: true })
  bander_url!: string | null;
}

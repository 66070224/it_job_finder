import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
@Unique(['user_id', 'company_id'])
export class CompanyFollow {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company!: Company;

  @Column({ type: 'uuid' })
  company_id!: string;

  @CreateDateColumn()
  followed_at!: Date;
}

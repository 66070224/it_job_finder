import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class CompanyFollow {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Company)
  company!: Company;

  @CreateDateColumn()
  followed_at!: Date;
}

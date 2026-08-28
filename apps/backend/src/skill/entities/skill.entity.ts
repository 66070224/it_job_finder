import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
@Entity()
export class Skill {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text', unique: true })
  name!: string;

  @ManyToOne(() => Category, (category) => category.skills)
  category!: Category;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}

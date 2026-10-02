import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category!: Category;

  @Column({ type: 'int' })
  category_id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}

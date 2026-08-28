import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from './skill.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text', unique: true })
  name!: string;

  @OneToMany(() => Skill, (skill) => skill.category)
  skills!: Skill[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}

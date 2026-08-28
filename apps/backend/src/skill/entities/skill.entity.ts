import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Category {
  PROGRAMMING_LANGUAGE = 'pl',
  FRONTEND_DEVELOPMENT = 'fd',
  BACKEND_DEVELOPMENT = 'bd',
  MOBILE_DEVELOPMENT = 'md',
  DATABaSE = 'db',
  DEVOPS_CLOUD = 'dc',
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text', unique: true })
  name!: string;

  @Column({ type: 'enum', enum: Category })
  category!: Category;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text' })
  key!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'uuid' })
  uploaded_by!: string;

  @CreateDateColumn()
  uploaded_at!: Date;
}

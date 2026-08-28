import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Entity()
export class Profile {
  @PrimaryColumn()
  uid!: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'uid',
    referencedColumnName: 'id',
  })
  user!: User;

  @Column({ type: 'text' })
  phone!: string;

  @Column({ type: 'date' })
  birth_date!: Date;

  @Column({ type: 'text' })
  about_me!: string;

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ type: 'text', nullable: true })
  github_url!: string | null;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills!: Skill[];

  @OneToMany(() => Education, (education) => education.profile)
  educations!: Education[];

  @OneToMany(() => Experience, (experience) => experience.profile)
  experiences!: Experience[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}

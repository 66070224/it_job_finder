import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}

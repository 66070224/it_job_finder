import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryColumn()
  uid!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user!: User;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'date', nullable: true })
  birth_date!: Date | null;

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ type: 'text', nullable: true })
  github_url!: string | null;
}

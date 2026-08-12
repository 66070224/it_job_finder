import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryColumn()
  uid!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user!: User;

  @Column({ type: 'text' })
  phone!: string;

  @Column({ type: 'date' })
  birth_date!: Date;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text', nullable: true })
  github_url!: string | null;
}

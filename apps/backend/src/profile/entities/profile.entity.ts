import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

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

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ type: 'text', nullable: true })
  github_url!: string | null;
}

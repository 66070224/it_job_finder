import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class JobInfo {
  @PrimaryColumn({ type: 'int' })
  job_id!: number;

  @OneToOne(() => Job, (job) => job.job_info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'job_id',
    referencedColumnName: 'id',
  })
  job!: Job;

  @Column({ type: 'jsonb', nullable: true }) // Rich Text (ไม่รู้ว่าฝั่ง front จะใช้ rich text แบบไหน เลยเป็น unknow ไปก่อน)
  description!: unknown | null;
}

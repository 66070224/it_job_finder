import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobInfo } from './entities/job_info.entity';
import { Application } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobInfo, Application])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}

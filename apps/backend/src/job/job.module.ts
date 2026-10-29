import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobInfo } from './entities/job_info.entity';
import { Application } from './entities/application.entity';
import { CompanyModule } from 'src/company/company.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, JobInfo, Application]),
    CompanyModule,
    AuthModule
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}

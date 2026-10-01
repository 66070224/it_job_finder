import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  createJob(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }
}

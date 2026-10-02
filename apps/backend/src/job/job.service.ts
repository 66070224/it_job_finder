import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}
  createJob(createJobDto: CreateJobDto) {
    return this.jobRepository.create();
  }
}

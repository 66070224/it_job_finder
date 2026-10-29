import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createJob(@Request() req, @Body() dto: CreateJobDto) {
    return this.jobService.addJob(dto, req.user);
  }
}

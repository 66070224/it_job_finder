import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { updateStatusDTO } from './dto/update-status.dto';
import { CreateApplicationDTO } from './dto/create-application.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createJob(@Request() req, @Body() dto: CreateJobDto) {
    const job_id = await this.jobService.addJob(dto, req.user);
    return { success: true, data: { job_id } };
  }

  @Get()
  getJob(@Query('page') page: number, @Query('limit') limit?: number) {
    return this.jobService.getJob({ page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Post('status')
  updateStatus(@Request() req, @Body() dto: updateStatusDTO) {
    return this.jobService.updateJobStatus({ user: req.user, dto });
  }

  @UseGuards(JwtAuthGuard)
  @Post('application')
  async applyApplication(@Request() req, @Body() dto: CreateApplicationDTO) {
    const id = await this.jobService.applyApplication({ user: req.user, dto });
    return { success: true, data: { application_id: id } };
  }
}

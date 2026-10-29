import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { User, UserRole } from 'src/user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { JobInfo } from './entities/job_info.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobInfo)
    private readonly jobInfoRepository: Repository<JobInfo>,
    private readonly companyService: CompanyService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(JobService.name);

  createJob(data: CreateJobDto, company: Company) {
    return this.jobRepository.create({
      company: company,
      title: data.title,
      salary_min: data.salary_min,
      salary_max: data.salary_max,
      experience: data.experience,
      employment_type: data.employment_type,
      arrangement: data.arrangement,
      capacity: data.capacity,
    });
  }

  createJobInfo(description: unknown | null, job: Job) {
    return this.jobInfoRepository.create({
      job: job,
      description: description,
    });
  }

  async addJob(data: CreateJobDto, user: User) {
    if (user.role != UserRole.COMPANY) {
      throw new ConflictException('User is not company');
    }

    const userCompany = await this.companyService.findByUser(user);
    if (!userCompany) {
      throw new ConflictException("User don't have company");
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const newJob = this.createJob(data, userCompany.company);
        const job = await manager.save(newJob);
        const newInfo = this.createJobInfo(data.description, job);
        await manager.save(newInfo);
      });
    } catch (err) {
      this.logger.error(
        'Create profile error',
        err instanceof Error ? err.stack : String(err),
      );

      throw new InternalServerErrorException('Server error');
    }
  }

  getJob({ page, limit }: { page: number; limit?: number }) {
    return this.jobRepository.find({
      order: { created_at: 'ASC' },
      skip: (page - 1) * 10,
      take: limit ? limit : 10,
      relations: {
        company: true,
      },
    });
  }
}

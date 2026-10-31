import {
  BadRequestException,
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
import { updateStatusDTO } from './dto/update-status.dto';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { UserService } from 'src/user/user.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobInfo)
    private readonly jobInfoRepository: Repository<JobInfo>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,

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
      throw new BadRequestException('User is not company');
    }

    const userCompany = await this.companyService.findByUser(user);
    if (!userCompany) {
      throw new ConflictException("User don't have company");
    }
    try {
      return await this.dataSource.transaction(async (manager) => {
        const newJob = this.createJob(data, userCompany.company);
        const job = await manager.save(newJob);
        const newInfo = this.createJobInfo(data.description, job);
        await manager.save(newInfo);
        return job.id;
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

  async updateJobStatus({ user, dto }: { user: User; dto: updateStatusDTO }) {
    if (user.role != UserRole.COMPANY) {
      throw new ConflictException('User is not company');
    }

    const userCompany = await this.companyService.findByUser(user);
    if (!userCompany) {
      throw new ConflictException("User don't have company");
    }

    const job = await this.jobRepository.findOne({ where: { id: dto.job_id } });
    if (!job) {
      throw new ConflictException('Job not exist');
    }

    if (job.company_id !== userCompany.id) {
      throw new BadRequestException("This job not belong to user's company");
    }

    await this.jobRepository.update(job.id, { status: dto.status });

    return {};
  }

  createApplication({
    user,
    dto,
    snapshot,
  }: {
    user: User;
    snapshot: Record<string, unknown>;
    dto: CreateApplicationDTO;
  }) {
    return this.applicationRepository.create({
      user: user,
      job_id: dto.job_id,
      profile_snapshot: snapshot,
      message: dto.message,
    });
  }

  async applyApplication({
    user,
    dto,
  }: {
    user: User;
    dto: CreateApplicationDTO;
  }) {
    if (user.role !== UserRole.JOB_SEEKER) {
      throw new BadRequestException('User is not job seeker');
    }

    const existedApplication = await this.applicationRepository.findOne({
      where: { user_id: user.id, job_id: dto.job_id },
    });

    if (existedApplication) {
      throw new ConflictException('User already applied for this job');
    }

    const snapshot = await this.userService.getSnapshot({ id: user.id });

    if (!snapshot) {
      throw new ConflictException('missing user and profile');
    }

    const newApplication = this.createApplication({
      user,
      dto,
      snapshot: instanceToPlain(snapshot),
    });

    const application = await this.applicationRepository.save(newApplication);

    return application.id;
  }
}

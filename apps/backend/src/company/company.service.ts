import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { DataSource, Repository } from 'typeorm';
import { CompanyInfo } from './entities/company-info.entity';
import { User, UserRole } from 'src/user/entities/user.entity';
import {
  CompanyMember,
  CompanyMemberRole,
  CompanyMemberStatus,
} from './entities/company-member.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(CompanyInfo)
    private readonly companyInfoRepository: Repository<CompanyInfo>,

    @InjectRepository(CompanyMember)
    private readonly companyMemberRepository: Repository<CompanyMember>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(CompanyService.name);

  createCompany(data: CreateCompanyDto) {
    return this.companyRepository.create({
      name: data.name,
      logo_url: data.logo_url,
      address: data.address,
    });
  }

  createCompanyInfo(company: Company) {
    return this.companyInfoRepository.create({ company: company });
  }

  createCompanyMember(
    user: User,
    company: Company,
    role: CompanyMemberRole,
    status: CompanyMemberStatus,
  ) {
    return this.companyMemberRepository.create({
      user: user,
      company: company,
      role: role,
      status: status,
    });
  }

  async insertCompany(user: User, data: CreateCompanyDto) {
    if (user.role != UserRole.COMPANY) {
      throw new ConflictException('User is not company');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const newCompany = this.createCompany(data);
        const company = await manager.save(newCompany);
        const newInfo = this.createCompanyInfo(company);
        await manager.save(newInfo);
        const member = this.createCompanyMember(
          user,
          company,
          CompanyMemberRole.OWNER,
          CompanyMemberStatus.ACCEPTED,
        );
        await manager.save(member);
      });
    } catch (err) {
      this.logger.error(
        'Create profile error',
        err instanceof Error ? err.stack : String(err),
      );

      throw new InternalServerErrorException('Server error');
    }
  }

  findByUser(user: User) {
    return this.companyMemberRepository.findOne({
      where: { user: user },
      relations: { company: true },
    });
  }
}

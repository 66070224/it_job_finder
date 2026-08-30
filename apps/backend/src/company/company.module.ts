import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyInfo } from './entities/company-info.entity';
import { CompanyMember } from './entities/company-member.entity';
import { CompanyFollow } from './entities/company-follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyInfo,
      CompanyMember,
      CompanyFollow,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}

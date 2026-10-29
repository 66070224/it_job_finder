import {
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArrangementType, EmploymentType } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsNumber()
  @IsOptional()
  salary_min!: number | null;

  @IsNumber()
  @IsOptional()
  salary_max!: number | null;

  @IsNumber()
  @IsOptional()
  experience!: number | null;

  @IsEnum(EmploymentType)
  employment_type!: EmploymentType;

  @IsEnum(ArrangementType)
  arrangement!: ArrangementType;

  @IsNumber()
  capacity!: number;

  @IsJSON()
  description!: unknown | null;
}

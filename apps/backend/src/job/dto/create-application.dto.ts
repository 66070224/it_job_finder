import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDTO {
  @IsNumber()
  job_id!: number;

  @IsString()
  @IsOptional()
  message!: string | null;
}

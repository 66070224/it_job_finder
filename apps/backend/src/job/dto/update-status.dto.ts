import { IsBoolean, IsEnum, IsNumber, IsUUID } from 'class-validator';

export class updateStatusDTO {
  @IsNumber()
  job_id!: number;

  @IsBoolean()
  status!: boolean;
}

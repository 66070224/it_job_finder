import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @Min(3)
  institution!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  startYear!: number;

  @IsInt()
  @IsOptional()
  endYear?: number;
}

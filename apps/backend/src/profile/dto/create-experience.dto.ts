import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  title!: string;

  @IsString()
  address!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  startYear!: number;

  @IsInt()
  @IsOptional()
  endYear?: number;
}

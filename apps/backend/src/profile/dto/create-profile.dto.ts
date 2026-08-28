import { IsDate, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Min(1)
  phone!: string;

  @IsDate()
  birthDate!: Date;

  @IsString()
  aboutMe!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;
}

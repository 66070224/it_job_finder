import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(1)
  phone!: string;

  @Type(() => Date)
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

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsBoolean()
  @IsOptional()
  email_verified?: boolean;

  @IsString()
  @MinLength(3)
  first_name!: string;

  @IsString()
  @MinLength(3)
  last_name!: string;

  @IsUrl()
  @ValidateIf((o, v) => v !== null && v !== undefined && v !== '')
  avatar_url?: string | null;

  @IsEnum(UserRole)
  role!: UserRole;
}

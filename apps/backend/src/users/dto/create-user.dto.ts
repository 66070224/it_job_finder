import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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

  @IsUrl()
  @ValidateIf((o, v) => v !== null && v !== undefined && v !== '')
  avatar_url?: string | null;

  @IsEnum(UserRole)
  role!: UserRole;
}

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsBoolean()
  email_verified!: boolean;

  @IsUrl()
  @ValidateIf((o, v) => v !== null && v !== undefined && v !== '')
  avatar_url?: string | null;

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsBoolean()
  profile_completed!: boolean;
}

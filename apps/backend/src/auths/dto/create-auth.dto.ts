import {
  IsEmail,
  IsEnum,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class CreateAuthDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

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

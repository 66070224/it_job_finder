import {
  IsEmail,
  IsEnum,
  IsIn,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';

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
}

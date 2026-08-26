import { IsEmail, IsString, MinLength } from 'class-validator';

export default class CreatePasswordAccountDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(3)
  firstName!: string;

  @IsString()
  @MinLength(3)
  lastName!: string;
}

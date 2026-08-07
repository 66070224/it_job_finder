import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  password!: string;
}

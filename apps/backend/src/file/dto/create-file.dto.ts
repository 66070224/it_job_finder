import { IsString, MinLength } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @MinLength(3)
  fileName!: string;
}

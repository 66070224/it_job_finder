import { Type } from 'class-transformer';
import {
  IsDate,
  IsObject,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateProfileDto {
  @ValidateNested()
  @Type(() => User)
  user!: User;

  @IsString()
  @Min(1)
  phone!: string;

  @IsDate()
  birth_date!: Date;

  @IsString()
  address!: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  github_url!: string | null;
}

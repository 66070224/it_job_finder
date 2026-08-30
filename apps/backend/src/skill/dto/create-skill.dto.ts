import { IsInt, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name!: string;

  @IsInt()
  categoryId!: number;
}

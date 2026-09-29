import { IsArray, IsInt, IsString } from 'class-validator';

export class AddSkillDto {
  @IsArray()
  @IsInt({ each: true })
  ids!: number[];
}

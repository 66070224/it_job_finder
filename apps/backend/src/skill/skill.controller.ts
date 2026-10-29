import { Controller, Get, Query } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAll() {
    return this.skillService.getAll();
  }

  @Get()
  searchByName(@Query('name') name: string) {
    return this.skillService.getManyByName(name);
  }
}

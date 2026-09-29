import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { AddSkillDto } from './dto/add-skill.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(@Request() req, @Body() dto: CreateProfileDto) {
    await this.profileService.insertProfile(req.user, dto);
    return { message: 'Done' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('education')
  createEducation(@Request() req, @Body() dto: CreateEducationDto) {
    return this.profileService.insertEducation(req.user, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('experience')
  createExperience(@Request() req, @Body() dto: CreateExperienceDto) {
    return this.profileService.insertExperience(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('skill')
  insertSkill(@Request() req, @Body() dto: AddSkillDto) {
    return this.profileService.insertSkill(req.user, dto);
  }
}

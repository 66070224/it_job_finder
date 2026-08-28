import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async insertProfile(@Request() req, @Body() dto: CreateProfileDto) {
    await this.profileService.insert(req.user, dto);
    return { message: 'Done' };
  }
}

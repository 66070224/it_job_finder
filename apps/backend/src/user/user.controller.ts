import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async insertProfile(@Request() req, @Body() dto: CreateProfileDto) {
    await this.userService.attachProfile(req.user, dto);
    return { message: 'Done' };
  }
}

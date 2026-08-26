import { Controller, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile')
  async insertProfile(@Request() req, @Body() dto: CreateProfileDto) {
    await this.userService.attachProfile(req.user, dto);
    return { message: 'Done' };
  }
}

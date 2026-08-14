import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createProfileDto: CreateProfileDto) {
    const user = await this.usersService.findOneById(req.user.id);
    if (!user) throw new UnauthorizedException();
    const profile = await this.profilesService.create(createProfileDto, user);
    await this.usersService.updateIsProfile(user.id, true);
    return profile;
  }
}

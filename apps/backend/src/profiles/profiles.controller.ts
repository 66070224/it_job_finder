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
  ConflictException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { UserRole } from 'src/users/entities/user.entity';

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
    if (!user) throw new UnauthorizedException('User not existed');
    if (user.is_profile)
      throw new ConflictException('User already has profile');
    if (user.role === UserRole.COMPANY)
      throw new ConflictException('User role is company');
    const profile = await this.profilesService.create(createProfileDto, user);
    await this.usersService.insertProfile(user.id);
    return profile;
  }
}

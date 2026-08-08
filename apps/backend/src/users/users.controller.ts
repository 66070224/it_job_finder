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
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    const access_token = req.headers.get('access_token');
    if (!access_token) throw new UnauthorizedException('');
    return this.usersService.findOneByToken(access_token);
  }
}

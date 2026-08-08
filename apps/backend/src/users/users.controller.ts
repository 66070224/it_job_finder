import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req: Request, @Param('profile') profile: boolean) {
    const access_token = req.headers.get('access_token');
    if (!access_token) throw new UnauthorizedException();
    return this.usersService.getUserByAccessToken(access_token, profile);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const { id, auth, updated_at, ...rest } = user;
    return { rest };
  }
}

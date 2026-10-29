import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Query('uid') uid: string) {
    return this.userService.findOneById({ id: uid, getProfile: true });
  }
}

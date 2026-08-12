import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  UseGuards,
  Req,
  Request,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { ProviderTypes } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('password')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const existedUser = await this.usersService.findOneByEmail(
      createAuthDto.email,
    );
    if (existedUser) throw new ConflictException('user already exist');

    const newUser = await this.usersService.create(
      createAuthDto.email,
      createAuthDto.first_name,
      createAuthDto.last_name,
      false,
    );

    const hashed_password = await this.authsService.hashPassword(
      createAuthDto.password,
    );

    await this.authsService.createAuth(
      newUser,
      ProviderTypes.PASSWORD,
      hashed_password,
    );

    return { message: 'Done' };
  }

  @UseGuards(AuthGuard('password'))
  @Post('signin')
  @HttpCode(200)
  async signIn(@Request() req: { user: { email: string; sub: string } }) {
    return this.authsService.signin({
      email: req.user.email,
      sub: req.user.sub,
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res: Response) {
    const token = await this.authsService.signin({
      email: req.user.email,
      sub: req.user.sub,
    });
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.redirect('http://localhost:3000');
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  getMe(@Req() req) {
    console.log(req.user);
    return this.usersService.findOneById(req.user.id);
  }
}

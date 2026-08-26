import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  ParseBoolPipe,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreatePasswordAccountDto from './dto/create-password-account.dto';
import { AuthGuard } from '@nestjs/passport';
import type { CookieOptions, Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { RefreshTokenAuthGuard } from './refresh-token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private getCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
    };
  }

  @Post('password')
  async create(@Body() dto: CreatePasswordAccountDto) {
    await this.authService.createPasswordAccount(dto);
    return { message: 'Done' };
  }

  @UseGuards(AuthGuard('password'))
  @Post('signin')
  @HttpCode(200)
  signIn(@Request() req) {
    return this.authService.getAuthToken(req.user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleSignIn() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Request() req, @Response() res: ExpressResponse) {
    const token = await this.authService.getAuthToken(req.user);

    res.cookie('access_token', token.access_token, this.getCookieOptions());

    res.cookie('refresh_token', token.refresh_token, this.getCookieOptions());

    return res.redirect(this.configService.getOrThrow<string>('FRONTEND_URL'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  getSession(
    @Request() req,
    @Query('profile', new DefaultValuePipe(false), ParseBoolPipe)
    profile: boolean,
  ) {
    return this.userService.findOneById({
      id: req.user.id,
      getProfile: profile,
    });
  }

  @Post('refresh')
  @UseGuards(RefreshTokenAuthGuard)
  refresh(@Request() req) {
    return this.authService.createAccessToken({
      sub: req.user.id,
      email: req.user.email,
    });
  }
}

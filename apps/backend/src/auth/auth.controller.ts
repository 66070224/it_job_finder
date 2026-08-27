import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Inject,
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
import type { Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { RefreshTokenAuthGuard } from './refresh-token-auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import ExchangeCodeToToken from './dto/exchange-code-to-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

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

    const code = randomUUID();

    await this.cacheManager.set(`token-code:${code}`, token);

    return res.redirect(
      `${this.configService.getOrThrow<string>('FRONTEND_URL')}/api/auth/google/callback?code=${code}`,
    );
  }

  @Post('exchange')
  @HttpCode(200)
  async exchangeCodeToToken(@Body() dto: ExchangeCodeToToken) {
    const token = await this.cacheManager.get(`token-code:${dto.code}`);
    return token;
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

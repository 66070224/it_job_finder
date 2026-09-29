import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ProviderType } from './entities/auth.entity';
import { TokenPayload } from './auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<TokenPayload> {
    const email = profile.emails?.[0].value;
    const firstName = profile.name?.givenName;
    const lastName = profile.name?.familyName;

    if (!email || !firstName || !lastName) {
      this.logger.log(email);
      this.logger.log(firstName);
      this.logger.log(lastName);
      throw new UnauthorizedException('Google account missing important data');
    }

    return this.authService.validateOAuthUser({
      providerType: ProviderType.GOOGLE,
      providerUserID: profile.id,
      email,
      firstName: firstName,
      lastName: lastName,
      avatarUrl: profile.photos?.[0]?.value,
    });
  }
}

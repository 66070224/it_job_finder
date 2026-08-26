import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ProviderTypes } from './entities/auth.entity';
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

  async validate(profile: Profile): Promise<TokenPayload> {
    const email = profile._json.email;

    if (!email) {
      throw new UnauthorizedException('Google account has no email');
    }

    return this.authService.validateOAuthUser({
      providerType: ProviderTypes.GOOGLE,
      providerUserID: profile.id,
      email: email,
      firstName: profile._json.given_name || '',
      lastName: profile._json.family_name || '',
      avatarUrl: profile._json.picture,
    });
  }
}

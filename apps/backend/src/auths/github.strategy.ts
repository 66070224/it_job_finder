import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { AuthsService } from './auths.service';
import { ProviderTypes } from './entities/auth.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authsService: AuthsService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auths/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(access_token: string, refreshToken: string, profile: Profile) {
    return this.authsService.validateOAuthUser(
      ProviderTypes.GITHUB,
      profile.id,
      profile.emails?.at(0)?.value!,
      profile.name?.givenName!,
      profile.name?.familyName!,
      profile.photos?.at(0)?.value!,
    );
  }
}

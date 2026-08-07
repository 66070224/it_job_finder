import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthsService } from './auths.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(private authsService: AuthsService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authsService.validatePasswordUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password are wrong');
    }
    return user;
  }
}

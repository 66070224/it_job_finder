import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(private authsService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    return this.authsService.validatePasswordUser({
      email: email,
      password: password,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(private authsService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authsService.validatePasswordUser({
      email: email,
      password: password,
    });
    return user;
  }
}

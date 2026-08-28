import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordStrategy } from './password.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({}),
    UserModule,
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordStrategy, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}

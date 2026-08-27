import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordStrategy } from './password.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({}),
    forwardRef(() => UserModule),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordStrategy,
    GoogleStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth, ProviderType } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as b from 'bcrypt';
import { TokenPayload } from './auth.interface';
import { UserService } from 'src/user/user.service';
import CreatePasswordAccountDto from './dto/create-password-account.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface CreateInput {
  user: User;
  providerType: ProviderType;
  hashedPassword?: string;
  providerUserId?: string;
}

interface ValidatePasswordUserInput {
  email: string;
  password: string;
}

interface ValidateOauthUserInput {
  providerType: ProviderType;
  providerUserID: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async create(data: CreateInput) {
    if (!data.hashedPassword && !data.providerUserId) {
      throw new BadRequestException(
        'Missing both hashed password and provider user id',
      );
    }
    return this.authRepository.create({
      user: data.user,
      provider_type: data.providerType,
      hashed_password: data.hashedPassword || null,
      provider_user_id: data.providerUserId || null,
    });
  }

  hashPassword(rawPassword: string) {
    return b.hash(rawPassword, 10);
  }

  async createPasswordAccount(data: CreatePasswordAccountDto) {
    const existUser = await this.userService.findOneByEmail({
      email: data.email,
    });

    if (existUser) throw new ConflictException('This email is already used');

    const hashedPassword = await this.hashPassword(data.password);

    const newUser = this.userService.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      emailVerified: false,
    });

    const newAuth = this.create({
      user: newUser,
      providerType: ProviderType.PASSWORD,
      hashedPassword: hashedPassword,
    });

    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(newUser);
        await manager.save(newAuth);
      });
    } catch (err) {
      this.logger.error(
        'Create password account error',
        err instanceof Error ? err.stack : String(err),
      );

      throw new InternalServerErrorException('Server error');
    }
  }

  async validatePasswordUser(
    data: ValidatePasswordUserInput,
  ): Promise<TokenPayload> {
    const auth = await this.authRepository.findOne({
      where: {
        user: { email: data.email },
        provider_type: ProviderType.PASSWORD,
      },
      relations: { user: true },
    });

    if (!auth) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    if (!auth.hashed_password) {
      this.logger.log(`Uid ${auth.user.id} is missing hashed password`);
      throw new InternalServerErrorException('Server Error');
    }

    const comparedResult = await b.compare(data.password, auth.hashed_password);

    if (!comparedResult) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    return { sub: auth.user.id, email: auth.user.email };
  }

  async validateOAuthUser(data: ValidateOauthUserInput): Promise<TokenPayload> {
    const existAuth = await this.authRepository.findOne({
      where: {
        user: { email: data.email },
        provider_type: data.providerType,
        provider_user_id: data.providerUserID,
      },
      relations: { user: true },
    });

    if (existAuth) {
      return { sub: existAuth.user.id, email: existAuth.user.email };
    }

    const existUser = await this.userService.findOneByEmail({
      email: data.email,
    });

    if (!existUser) {
      const newUser = await this.userService.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        emailVerified: true,
        avatarUrl: data.avatarUrl,
      });

      const newAuth = await this.create({
        user: newUser,
        providerType: data.providerType,
        providerUserId: data.providerUserID,
      });

      try {
        await this.dataSource.transaction(async (manager) => {
          await manager.save(newUser);
          await manager.save(newAuth);
        });
      } catch (err) {
        this.logger.error(
          'Create oauth account error',
          err instanceof Error ? err.stack : String(err),
        );

        throw new InternalServerErrorException('Server error');
      }
      return { email: newUser.email, sub: newUser.id };
    }

    if (!existUser.email_verified) {
      await this.userService.updateEmailVerified({
        id: existUser.id,
        emailVerified: true,
      });
    }

    const newAuth = await this.create({
      user: existUser,
      providerType: data.providerType,
      providerUserId: data.providerUserID,
    });

    await this.authRepository.save(newAuth);

    return { email: newAuth.user.email, sub: newAuth.user.id };
  }

  async createAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: '30m',
    });
  }

  async createRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('REFRESH_SECRET'),
      expiresIn: '7d',
    });
  }

  async getAuthToken(payload: TokenPayload) {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

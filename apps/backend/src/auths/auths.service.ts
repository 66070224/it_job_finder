import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { Auth, ProviderTypes } from './entities/auth.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as b from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async createAuth(
    user: User,
    provider: ProviderTypes,
    hashed_password?: string,
    provider_user_id?: string,
  ) {
    const auth = this.authRepository.create({
      user,
      provider_type: provider,
      hashed_password,
      provider_user_id,
    });
    return this.authRepository.save(auth);
  }

  hashPassword(password: string) {
    return b.hash(password, 10);
  }

  async validatePasswordUser(
    email: string,
    password: string,
  ): Promise<{ email: string; sub: string } | null> {
    const existAuth = await this.authRepository.findOne({
      where: { user: { email: email }, provider_type: ProviderTypes.PASSWORD },
      relations: { user: true },
    });
    if (!existAuth) return null;
    if (!(await b.compare(password, existAuth.hashed_password!))) return null;
    return { email: existAuth.user.email, sub: existAuth.user.id };
  }

  async signin(email: string, sub: string) {
    return {
      access_token: this.jwtService.sign({ email, sub }),
    };
  }

  async validateOAuthUser(
    provider_type: ProviderTypes,
    providerID: string,
    email: string,
    first_name: string,
    last_name: string,
    picture: string,
  ) {
    const existAuth = await this.authRepository.findOne({
      where: {
        user: { email: email },
        provider_type: provider_type,
        provider_user_id: providerID,
      },
      relations: { user: true },
    });
    if (existAuth) {
      return { email: existAuth.user.email, sub: existAuth.user.id };
    }

    const existUser = await this.usersService.findOneByEmail(email);

    if (existUser) {
      if (!existUser.email_verified) {
        await this.usersService.updateEmailVerified(existUser.id, true);
      }
      const newAuth = await this.createAuth(
        existUser,
        provider_type,
        undefined,
        providerID,
      );
      return { email: newAuth.user.email, sub: newAuth.user.id };
    }

    const newUser = await this.usersService.create(
      email,
      first_name,
      last_name,
      picture,
    );
    const newAuth = await this.createAuth(
      newUser,
      provider_type,
      undefined,
      providerID,
    );
    return { email: newAuth.user.email, sub: newAuth.user.id };
  }

  findOneByEmailAndProvider(
    email: string,
    provider: ProviderTypes,
  ): Promise<Auth | null> {
    return this.authRepository.findOne({
      where: { user: { email }, provider_type: provider },
    });
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

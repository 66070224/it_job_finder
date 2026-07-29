import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { Auth, ProviderTypes } from './entities/auth.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as b from 'bcrypt';
import { isEmail } from 'class-validator';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}
  async createPasswordAuth(
    user: User,
    provider: ProviderTypes,
    hashed_password?: string,
  ) {
    const auth = this.authRepository.create({
      user,
      provider_type: provider,
      hashed_password,
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
    if (existAuth === null) return null;
    if (!(await b.compare(password, existAuth.hashed_password!))) return null;
    return { email: existAuth.user.email, sub: existAuth.user.id };
  }

  async signin(email: string, sub: string) {
    return {
      access_token: this.jwtService.sign({ email, sub }),
    };
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

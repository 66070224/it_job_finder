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

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
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

  async validatePasswordUser(email: string, password: string) {
    const auth = await this.authRepository.findOne({
      where: { user: { email: email }, provider_type: ProviderTypes.PASSWORD },
    });
    if (auth === null)
      throw new UnauthorizedException(
        'Could not find user match with this email',
      );
    const isPassed = await b.compare(password, auth.hashed_password!);
  }

  findOneByEmailAndProvider(
    user: User,
    provider: ProviderTypes,
  ): Promise<Auth | null> {
    return this.authRepository.findOne({
      where: { user: user, provider_type: provider },
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

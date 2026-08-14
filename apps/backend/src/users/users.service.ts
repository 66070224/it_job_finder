import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmail, isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicUserRole, User, UserRole } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  create(
    email: string,
    first_name: string,
    last_name: string,
    email_verified: boolean,
    avatar_url?: string,
  ) {
    const user = this.userRepository.create({
      email,
      first_name,
      last_name,
      email_verified,
      avatar_url,
    });
    return this.userRepository.save(user);
  }

  findOneById(id: string, profile = false): Promise<User | null> {
    if (!isUUID(id)) throw new BadRequestException('id is not uuid');
    return this.userRepository.findOne({
      where: { id: id },
      relations: { profile },
    });
  }
  findOneByEmail(email: string, profile = false): Promise<User | null> {
    if (!isEmail(email)) throw new BadRequestException('email is not valid');
    return this.userRepository.findOne({
      where: { email: email },
      relations: { profile },
    });
  }

  findOneByToken(token: string, profile = false): Promise<User | null> {
    const { email, sub }: { email: string; sub: string } =
      this.jwtService.decode(token);
    return this.userRepository.findOne({
      where: { email, id: sub },
      relations: { profile },
    });
  }

  updateEmailVerified(id: string, email_verified: boolean) {
    return this.userRepository.update(id, { email_verified: email_verified });
  }

  updateIsProfile(id: string, is_profile: boolean) {
    return this.userRepository.update(id, { is_profile });
  }
}

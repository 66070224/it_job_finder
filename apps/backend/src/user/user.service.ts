import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';

interface CreateInput {
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  avatarUrl?: string;
}

interface FindOneByEmailInput {
  email: string;
  getProfile?: boolean;
}

interface FindOneByIdInput {
  id: string;
  getProfile?: boolean;
}

interface UpdateEmailVerifiedInput {
  id: string;
  emailVerified: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(UserService.name);

  create(data: CreateInput) {
    return this.userRepository.create({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      email_verified: data.emailVerified,
      avatar_url: data.avatarUrl || null,
    });
  }

  findOneByEmail(data: FindOneByEmailInput) {
    return this.userRepository.findOne({
      where: { email: data.email },
      relations: { profile: data.getProfile || false },
    });
  }
  findOneById(data: FindOneByIdInput) {
    return this.userRepository.findOne({
      where: { id: data.id },
      relations: { profile: data.getProfile || false },
    });
  }

  updateEmailVerified(data: UpdateEmailVerifiedInput) {
    return this.userRepository.update(data.id, {
      email_verified: data.emailVerified,
    });
  }

  async attachProfile(user: User, profile: Profile) {
    if (user.is_profile) {
      throw new ConflictException('User already has profile');
    }

    if (user.role === UserRole.COMPANY) {
      throw new ConflictException('User role is company');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(profile);
        await manager.update(User, user.id, {
          is_profile: true,
          profile: profile,
        });
      });
    } catch (err) {
      this.logger.error(
        'Attach profile error: ',
        err instanceof Error ? err.stack : String(err),
      );

      throw new InternalServerErrorException('Server error');
    }

    return;
  }
}

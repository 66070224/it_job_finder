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

interface UpdateUserRoleInput {
  id: string;
  role: UserRole;
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

  getSnapshot({ id }: { id: string }) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: {
          files: true,
          skills: true,
          experiences: true,
          educations: true,
        },
      },
    });
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  create(user: User, data: CreateProfileDto) {
    return this.profileRepository.create({
      user: user,
      phone: data.phone,
      address: data.address || null,
      birth_date: data.birthDate,
      github_url: data.githubUrl || null,
    });
  }
}

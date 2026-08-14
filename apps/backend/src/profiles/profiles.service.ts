import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  create(dto: CreateProfileDto, user: User) {
    const newProfile = this.profileRepository.create({
      user: user,
      phone: dto.phone,
      address: dto.address,
      birth_date: dto.birth_date,
      github_url: dto.github_url,
    });

    return this.profileRepository.save(newProfile);
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly educationRepository: Repository<Education>,
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  createProfile(user: User, data: CreateProfileDto) {
    return this.profileRepository.create({
      uid: user.id,
      user: user,
      phone: data.phone,
      address: data.address || null,
      about_me: data.aboutMe,
      birth_date: data.birthDate,
      github_url: data.githubUrl || null,
    });
  }

  createEducation(profile: Profile, data: CreateEducationDto) {
    return this.educationRepository.create({
      profile: profile,
      institution: data.institution,
      description: data.description ?? null,
      start_year: data.startYear,
      end_year: data.endYear ?? null,
    });
  }

  createExperience(profile: Profile, data: CreateExperienceDto) {
    return this.experienceRepository.create({
      profile: profile,
      title: data.title,
      description: data.description ?? null,
      address: data.address,
      start_year: data.startYear,
      end_year: data.endYear ?? null,
    });
  }

  async insertProfile(user: User, data: CreateProfileDto) {
    if (user.role !== UserRole.JOB_SEEKER) {
      throw new ConflictException('User is not job seeker');
    }

    if (user.profile) {
      throw new ConflictException('User already has profile');
    }
    const newProfile = this.createProfile(user, data);

    return this.profileRepository.save(newProfile);
  }

  async insertEducation(user: User, data: CreateEducationDto) {
    const profile = await this.profileRepository.findOne({
      where: { user: user },
    });

    if (!profile) {
      throw new ConflictException('User missing profile');
    }

    const newEducation = this.createEducation(profile, data);

    return this.educationRepository.save(newEducation);
  }

  async insertExperience(user: User, data: CreateExperienceDto) {
    const profile = await this.profileRepository.findOne({
      where: { user: user },
    });

    if (!profile) {
      throw new ConflictException('User missing profile');
    }

    const newExperience = this.createExperience(profile, data);

    return this.educationRepository.save(newExperience);
  }
}

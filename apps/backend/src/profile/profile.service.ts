import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User, UserRole } from 'src/user/entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from './entities/experience.entity';
import { AddSkillDto } from './dto/add-skill.dto';
import { SkillService } from 'src/skill/skill.service';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,

    private readonly SkillService: SkillService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(ProfileService.name);

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
    if (user.profile) {
      throw new ConflictException('User already has profile');
    }
    const newProfile = this.createProfile(user, data);

    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.update(User, user.id, { role: UserRole.JOB_SEEKER });
        await manager.save(newProfile);
      });
    } catch (err) {
      this.logger.error(
        'Create profile error',
        err instanceof Error ? err.stack : String(err),
      );

      throw new InternalServerErrorException('Server error');
    }

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

  async insertSkill(user: User, data: AddSkillDto) {
    const profile = await this.profileRepository.findOne({
      where: { user: user },
    });

    if (!profile) {
      throw new ConflictException('User missing profile');
    }

    const skills = await this.SkillService.getManyById(data.ids);
    profile.skills.push(...skills);

    return this.profileRepository.save(profile);
  }
}

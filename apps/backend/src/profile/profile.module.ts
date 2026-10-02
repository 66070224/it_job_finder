import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Skill } from 'src/skill/entities/skill.entity';
import { SkillModule } from 'src/skill/skill.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Education, Experience, Skill]),
    AuthModule,
    SkillModule,
    FileService,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}

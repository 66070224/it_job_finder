import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Education, Experience]),
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
  exports: [ProfileService],
})
export class ProfileModule {}

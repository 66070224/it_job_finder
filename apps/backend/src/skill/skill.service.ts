import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  getOneById(id: number) {
    return this.skillRepository.findOne({ where: { id: id } });
  }

  getManyById(ids: number[]) {
    return this.skillRepository.find({ where: { id: In(ids) } });
  }

  getAll() {
    return this.skillRepository.find();
  }
}

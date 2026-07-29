import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmail, isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(email: string, first_name: string, last_name: string, role: UserRole) {
    const user = this.userRepository.create({
      email,
      first_name,
      last_name,
      role,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneById(id: string): Promise<User | null> {
    if (!isUUID(id)) throw new BadRequestException('id is not uuid');
    return this.userRepository.findOneBy({ id: id });
  }
  findOneByEmail(email: string): Promise<User | null> {
    if (!isEmail(email)) throw new BadRequestException('email is not valid');
    return this.userRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

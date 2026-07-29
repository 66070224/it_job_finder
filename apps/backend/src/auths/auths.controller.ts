import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { ProviderTypes } from './entities/auth.entity';
import { SignInDTO } from './dto/sign-in.dto';
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('password')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const existedUser = await this.usersService.findOneByEmail(
      createAuthDto.email,
    );
    if (existedUser) throw new ConflictException('user already exist');

    const newUser = await this.usersService.create(
      createAuthDto.email,
      createAuthDto.first_name,
      createAuthDto.last_name,
      createAuthDto.role,
    );

    const hashed_password = await this.authsService.hashPassword(
      createAuthDto.password,
    );

    await this.authsService.createPasswordAuth(
      newUser,
      ProviderTypes.PASSWORD,
      hashed_password,
    );

    return 'Done';
  }

  @Post('signin')
  async signIn(@Body() dto: SignInDTO) {
    const user = await this.authsService.validatePasswordUser(
      dto.email,
      dto.password,
    );

    if (!user) throw new UnauthorizedException('email or password are wrong');

    return this.authsService.signin(user.email, user.sub);
  }

  @Get()
  findAll() {
    return this.authsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authsService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }
}

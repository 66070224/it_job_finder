import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { ProviderTypes } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';
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
    );

    const hashed_password = await this.authsService.hashPassword(
      createAuthDto.password,
    );

    await this.authsService.createAuth(
      newUser,
      ProviderTypes.PASSWORD,
      hashed_password,
    );

    return 'Done';
  }

  @UseGuards(AuthGuard('password'))
  @Post('signin')
  async signIn(@Request() req: { user: { email: string; sub: string } }) {
    return this.authsService.signin(req.user.email, req.user.sub);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async oauthLogin(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async oauthCallback(@Req() req) {
    return this.authsService.signin(req.user.email, req.user.sub);
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

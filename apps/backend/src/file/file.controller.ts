import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const key = await this.fileService.upload(req.user, file);
    return { key };
  }

  @Get('url')
  async url(@Query('key') key: string) {
    return { url: await this.fileService.getPresignedUrl(key) };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('parser')
  @UseInterceptors(
    FileInterceptor('resume', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  parser(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('PDF file is required');
    }
    if (file.mimetype != 'application/pdf') {
      throw new BadRequestException('Invalid file type, Only PDF are allowed');
    }
    return this.aiService.resumeParser(file);
  }
}

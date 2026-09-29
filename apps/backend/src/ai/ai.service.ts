import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import OpenAI from 'openai';
import type { Multer } from 'multer';
import { Readable } from 'stream';

@Injectable()
export class AiService {
  constructor(@Inject('OPENAI_CLIENT') private readonly openai: OpenAI) {}
  async resumeParser(file: Express.Multer.File) {
    try {
      const base64 = file.buffer.toString('base64');

      const completion = await this.openai.chat.completions.create({
        model: 'xiaomi-mimo-v2-6-flash',
        messages: [
          {
            role: 'system',
            content:
              'You are resume parser, extract all data from user resume.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'file',
                file: {
                  filename: file.originalname,
                  file_data: `data:${file.mimetype};base64,${base64}`,
                },
              },
            ],
          },
        ],
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      throw new InternalServerErrorException(
        'Fail to process resume',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}

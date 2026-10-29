import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  constructor(@Inject('OPENAI_CLIENT') private readonly openai: OpenAI) {}
  async resumeParser(file: Express.Multer.File) {
    try {
      const base64Data = file.buffer.toString('base64');
      const dataUrl = `data:application/pdf;base64,${base64Data}`;

      const completion = await this.openai.chat.completions.create({
        model: 'xiaomi-mimo-v2-6-flash',
        messages: [
          {
            role: 'system',
            content:
              'You are resume parser, extract all information from this PDF and format it neatly.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: dataUrl,
                },
              },
            ],
          },
        ],
        temperature: 0,
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

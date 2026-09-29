import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,
    {
      provide: 'OPENAI_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new OpenAI({
          apiKey: configService.getOrThrow<string>('AI_API_KEY'),
          baseURL: configService.getOrThrow<string>('AI_BASE_URL'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AiModule {}

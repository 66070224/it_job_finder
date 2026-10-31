import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getChat(@Request() req, @Query('target_id') target_id: string) {
    return this.chatService.getChat({ user: req.user, target_id });
  }
}

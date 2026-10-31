import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.create(createChatDto);
  }

  async saveChat(createChatDto: CreateChatDto) {
    const newChat = this.create(createChatDto);

    const chat = await this.chatRepository.save(newChat);

    return { message: chat.message };
  }

  getChat({ user, target_id }: { user: User; target_id: string }) {
    return this.chatRepository.find({
      where: {
        sender_id: In([user.id, target_id]),
        receiver_id: In([user.id, target_id]),
      },
      order: { created_at: 'DESC' },
    });
  }
}

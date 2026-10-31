import { IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  sender_id!: string;

  @IsUUID()
  receiver_id!: string;

  @IsString()
  message!: string;
}

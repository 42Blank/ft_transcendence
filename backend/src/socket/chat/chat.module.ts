import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { ConnectionHandleModule } from '../connection-handle';
import { ChatGateway } from './chat.gateway';
import { ChatRoomRepository } from './repository/chat-room.repository';
import { ChatRoomService } from './service/chat-room.service';
import { ChatUserService } from './service/chat-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConnectionHandleModule],
  providers: [ChatRoomRepository, ChatRoomService, ChatUserService, ChatGateway],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { ConnectionHandleModule } from '../connection-handle';
import { ChatGateway } from './chat.gateway';
import { ChatRoomRepository } from './repository/chat-room.repository';
import { UserSocketRepository } from './repository/user-socket.repository';
import { ChatRoomService } from './service/chat-room.service';
import { ChatUserService } from './service/chat-user.service';
import { UserConnectionService } from './service/user-connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConnectionHandleModule],
  providers: [
    ChatRoomRepository,
    UserSocketRepository,
    ChatRoomService,
    ChatUserService,
    UserConnectionService,
    ChatGateway,
  ],
})
export class ChatModule {}

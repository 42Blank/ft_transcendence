import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { SocketRepositoryModule } from '../../common/database/repository';
import { ConnectionHandleModule } from '../connection-handle';
import { OnlineModule } from '../online';
import { ChatGateway } from './chat.gateway';
import { ChatRoomService } from './service/chat-room.service';
import { ChatUserOperateService } from './service/chat-user-operate.service';
import { ChatUserService } from './service/chat-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), //
    ConnectionHandleModule,
    SocketRepositoryModule,
    OnlineModule, // Fix me
  ],
  providers: [ChatRoomService, ChatUserService, ChatUserOperateService, ChatGateway],
})
export class ChatModule {}

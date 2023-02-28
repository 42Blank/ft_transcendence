import { Module } from '@nestjs/common';
import { ChatRoomRepository } from './chat-room.repository';
import { GameRoomRepository } from './game-room.repository';
import { OnlineUserRepository } from './online-user.repository';

@Module({
  providers: [ChatRoomRepository, GameRoomRepository, OnlineUserRepository],
  exports: [ChatRoomRepository, GameRoomRepository, OnlineUserRepository],
})
export class SocketRepositoryModule {}

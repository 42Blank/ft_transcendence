import { Module } from '@nestjs/common';
import { ChatRoomRepository } from './chat-room.repository';
import { GameMatchQueueRepository } from './game-match-queue.repository';
import { GameRoomRepository } from './game-room.repository';
import { OnlineUserRepository } from './online-user.repository';

@Module({
  providers: [ChatRoomRepository, GameRoomRepository, OnlineUserRepository, GameMatchQueueRepository],
  exports: [ChatRoomRepository, GameRoomRepository, OnlineUserRepository, GameMatchQueueRepository],
})
export class SocketRepositoryModule {}

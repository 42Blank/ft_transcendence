import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { GameRoom } from '../../../common/database/model';
import { GameRoomRepository } from '../../../common/database/repository';
import { GameRoomDto } from '../dto/outcoming/game-room.dto';

@Injectable()
export class GameRoomService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public createGameRoom(socketId: string, userId: number, mode: GameRoom['mode']): GameRoom {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.host.socketId === socketId || (gameRoom.challenger && gameRoom.challenger.socketId === socketId);
    });

    if (gameRoom) {
      throw new NotAcceptableException(`Socket ${socketId} is already in game room ${gameRoom.id}`);
    }

    return this.gameRoomRepository.createGameRoom(socketId, userId, mode);
  }

  public async getGameRooms(): Promise<GameRoomDto[]> {
    const gameRooms = this.gameRoomRepository.getGameRooms();

    return Promise.all(gameRooms.map(async gameRoom => await this.buildGameRoomDto(gameRoom)));
  }

  private async buildGameRoomDto(gameRoom: GameRoom): Promise<GameRoomDto> {
    const gameRoomDto: GameRoomDto = {
      id: gameRoom.id,
      state: gameRoom.state,
      mode: gameRoom.mode,
      score: gameRoom.score,
      host: {
        user: await this.userRepository.findOneBy({ id: gameRoom.host.userId }),
        ready: gameRoom.host.ready,
      },
    };

    if (gameRoom.challenger) {
      gameRoomDto.challenger = {
        user: await this.userRepository.findOneBy({ id: gameRoom.challenger.userId }),
        ready: gameRoom.challenger.ready,
      };
    }

    if (gameRoom.state === 'finished') {
      gameRoomDto.matchHistoryId = gameRoom.matchHistoryId;
    }

    return gameRoomDto;
  }
}

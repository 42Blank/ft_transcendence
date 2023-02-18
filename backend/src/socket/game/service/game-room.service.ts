import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { GameRoomDto } from '../dto/outcoming/game-room.dto';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';

@Injectable()
export class GameRoomService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public createGameRoom(socketId: string, userId: number): GameRoom {
    this.gameRoomRepository.removeSocketFromAllGameRooms(socketId);

    return this.gameRoomRepository.createGameRoom(socketId, userId);
  }

  public async getGameRooms(): Promise<GameRoomDto[]> {
    const gameRooms = this.gameRoomRepository.getGameRooms();

    return Promise.all(gameRooms.map(async gameRoom => await this.buildGameRoomDto(gameRoom)));
  }

  private async buildGameRoomDto(gameRoom: GameRoom): Promise<GameRoomDto> {
    const gameRoomDto: GameRoomDto = {
      id: gameRoom.id,
      state: gameRoom.state,
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

    return gameRoomDto;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { GameRoom } from '../../../../common/database/model';

enum GameMode {
  NORMAL = 'normal',
  RED = 'red',
}

export class CreateGameRoomDto {
  @IsEnum(GameMode)
  @IsNotEmpty()
  @ApiProperty({ example: 'normal' })
  mode: GameRoom['mode'];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { User } from 'common/database/entities/user.entity';

export class MatchHistoryResponseDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: '1', description: '매치 고유 id' })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ description: '승리 유저' })
  winner: User;

  @IsNotEmpty()
  @ApiProperty({ description: '패배 유저' })
  loser: User;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: '경기 시간' })
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InviteGameRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  fromSocketId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  toSocketId: string;
}

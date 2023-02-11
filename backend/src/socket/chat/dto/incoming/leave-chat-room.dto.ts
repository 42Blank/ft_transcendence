import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a0fa5607-90a7-42da-aeb5-0dfa75b62721' })
  id: string;
}

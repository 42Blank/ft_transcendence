import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @ApiProperty({ example: 'hello' })
  message: string;

  @IsString()
  @ApiProperty()
  timestamp: string;
}

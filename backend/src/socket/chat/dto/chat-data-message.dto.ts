import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatDataMessageDto {
  @IsString()
  @ApiProperty({ example: 'hello' })
  message: string;

  @IsString()
  @ApiProperty()
  timestamp: string;
}

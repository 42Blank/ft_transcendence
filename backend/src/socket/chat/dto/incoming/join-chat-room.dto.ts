import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JoinChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a0fa5607-90a7-42da-aeb5-0dfa75b62721' })
  chatRoomId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'asdf' })
  password?: string;
}

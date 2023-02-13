import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a0fa5607-90a7-42da-aeb5-0dfa75b62721' })
  id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'name' })
  roomTitle: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({ example: false })
  isPrivate: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'asdf' })
  password?: string;
}

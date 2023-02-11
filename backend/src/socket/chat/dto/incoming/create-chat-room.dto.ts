import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  roomTitle: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ApiProperty({ example: false })
  isPrivate: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'asdf' })
  password?: string;
}

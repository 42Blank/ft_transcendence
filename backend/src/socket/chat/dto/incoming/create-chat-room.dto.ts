import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

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
  @ApiPropertyOptional({ example: '1-2' })
  dmId?: string;

  @IsString()
  @ValidateIf(o => o.isPrivate)
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'asdf' })
  password?: string;
}

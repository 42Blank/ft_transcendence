import { Trim } from '@miaooo/class-transformer-trim';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(8)
  @Trim()
  @ApiPropertyOptional({ example: 'jasong' })
  nickname?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(500)
  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  avatar?: string;
}

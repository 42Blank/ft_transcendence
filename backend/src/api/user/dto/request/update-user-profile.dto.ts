import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'jasong' })
  nickname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  avatar?: string;
}
